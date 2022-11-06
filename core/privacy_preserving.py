from pathlib import Path
from sql.messreg import parse_sql
from pathlib import Path
from sampler import VideoSampler
from sampler import frame_to_video

from mutils import *
from constant import *
from detect import DetectRes, detect_face_facenet, detect_for_fxevs, draw_bboxes, Tracker, do_tracking
from cartooner import cartoonize
from blurring import model_rects
import os
import time


class Protector:
    '''
    At first, we have a sql query for the privacy-preserving video inquery.
    So, we need to parse the sentence and derive some conditions which we use to process video.
    Then when the process goes on, the conditions will bound the video and make works.
    '''
    def __init__(self, cartoon=False, tracking=True, cache=False, effect_type=1, debug=False, only_cartoon=False):
        '''
        effect_type: 0 -> black out; 1 -> dynamical blurring; 2 -> pixelating; 3 -> contant blurring
        '''

        self.protect_conditions = []
        self.expose_conditions = []
        self.time_intervals = []
        self.intensity = 1

        self.video_source = ''
        self.video_sampler = None
        self.debug = debug
        self.sampling_rate = 30

        # some knobs
        self.cartoon = cartoon
        self.cache = cache
        self.only_cartoon = only_cartoon
        self.effect_type = effect_type
        
        ## use cache to speed up generation
        self.detect_caches = collections.defaultdict(dict)
        self.cartoon_caches = collections.defaultdict(dict) # id is video name, the inner format is {frame_id : img, ...}

        self.target_detect_cache = None
        self.target_cartoon_cache = None

        '''bring tracking into our system'''
        self.tracking = tracking
        self.last_frame = None
        self.last_det_res = None
        self.MAX_FRAME_DIFF = 120
        self.last_frame_id = 0
        self.tracker_type = 'CSRT'


        '''performance metrics'''
        self.processed_frame_count = 0
        self.processed_duration = 0

    def sql(self, sql_str):
        start_time = time.time()
        # do sql parse
        sql_res = parse_sql(sql_str)
        self.video_source = sql_res['FROM']
        self.time_intervals = sql_res['WHERE']['timestamp']
        self.protect_conditions = sql_res['PROTECT']
        if 'EXPOSE' in sql_res:
            self.expose_conditions = sql_res['EXPOSE']


        # print("DEBUG\nwhere", self.time_intervals, "\nsource", self.video_source, \
        #     "\nprotect", self.protect_conditions, "\nexpose", self.expose_conditions)
        
        # ## for detail print the expose list
        # for i, cond in enumerate(self.expose_conditions):
        #     s = f'cond {i}: '
        #     for item in cond:
        #         s += f'{item.name}, {item.type}; '
        #     print(s)
        # ## for detail in print the protect list
        # for i, cond in enumerate(self.protect_conditions):
        #     s = f'cond {i}:'
        #     for item in cond:
        #         s += f'{item.name}, {item.type};'
        #     print(s)
        
        if not self.open_video(self.video_source):
            return
        
        ## cache related
        if self.cache:
            self.target_cartoon_cache = self.cartoon_caches[self.video_source]
            self.target_detect_cache = self.detect_caches[self.video_source]
            # print(f"Link to the dict[{self.video_source}]", self.target_cartoon_cache != None, self.target_detect_cache != None)

        ##

        self.processed_frame_count = 0
        self.produce_video()
        # print("SQL finish. Runtime:", time.time() - start_time, 's')
        duration = time.time() - start_time
        print('SQL finished. Runtime: {duration}s.',duration)
        return

    def enable_cache(self):
        self.cache = True
    
    def disable_cache(self):
        self.cache = False

    def enable_tracking(self):
        self.tracking = True

    def disable_tracking(self):
        self.tracking = False

    def open_video(self, path):
        file = Path(path)
        if not file.exists():
            print("Video not exist.")
            return False

        self.video_sampler = VideoSampler(str(path), skip_frame_cnt=self.sampling_rate-1) # at first not skip frame
        return True


    def produce_video(self):
        if self.tracking:
            self.last_det_res = None
            self.last_frame = None
        # generate the privacy-preversing video
        frames = []
        start_time = time.time()
        frame_t = 1
        self.processed_frame_count = 0
        while frame_t > 0:
            
            frame_id, f = self.video_sampler.get_next_frame()
            if frame_id == -1:
                break
            frame_t += 1
            print("Process frame", frame_id)
            self.processed_frame_count += 1
            frames.append(self.process_frame(f, frame_id))

        self.processed_duration = time.time() - start_time
        fps = self.processed_frame_count / self.processed_duration
        #print(f'Process Video frames: {self.processed_frame_count}, duration: {self.processed_duration}s, fps: {fps}.')
        print('Process Video frames:', self.processed_frame_count, 'duration:', self.processed_duration, 'fps:', fps)
        # handle the duplicate name
        name = 'output'
        dir = './output/'
        suffix = 0
        while os.path.exists(dir + name + str(suffix) + '.avi'):
            suffix += 1
        frame_to_video(frames, dir, name + str(suffix) + '.avi', max(1, int(30 / self.sampling_rate)))


    def any_condition_fulfill(bbox, conditions):
        # if one of these conditions are fulfilled, then we add the current bbox to the protect_bbox
        for cond in conditions:
            fulfill = True
            # all item will be fulfilled.
            for item in cond:
                # print(type(item))
                from sql.list_item import listitem
                if type(item) == listitem and item.name != classno2name(bbox[RES_CLASS_IDX]) or \
                    type(item) == str and item != classno2name(bbox[RES_CLASS_IDX]):
                    fulfill = False
                    break

            if fulfill:
                return True

        return False




    def process_frame(self, total_model, liscence_model, frame, mtcnn=None, frame_id = 0):

        # print(detect_res.get_objects())
        # print("DEBUG at process frame, objects are", detect_res.get_objects())
        if self.cartoon:
            if self.cache and self.target_cartoon_cache != None and frame_id in self.target_cartoon_cache:
                cartoon_img = self.target_cartoon_cache[frame_id]
                # print("Use cartton result at", frame_id)
            else:
                cartoon_img = cartoonize(frame) # bottleneck: too slow, we need to switch to other method
            
            # save the cartoon_img into cache
            if self.cache and self.target_cartoon_cache != None and frame_id not in self.target_cartoon_cache:
                self.target_cartoon_cache[frame_id] = cartoon_img
                # print("Save cartoon result at", frame_id)
        else:
            cartoon_img = frame
        
        if self.only_cartoon:
            return cartoon_img

        # process just one frame a time
        # we need to put the conditions on the source video
        if self.cache and self.target_detect_cache != None and frame_id in self.target_detect_cache:
            detect_res = self.target_detect_cache[frame_id]
            # print("Use detect cache at frame", frame_id)
        else:
            # we need to optimize the detect model, because we are confident that detect once is sufficient.
            detect_res = detect_for_fxevs(frame, total_model)
            detect_res.append(detect_for_fxevs(frame, liscence_model, model_type=1))
            # detect_res.append(detect_face_facenet(mtcnn, frame))
        
        
        if self.tracking:
            # print("Before Tracking {} objects are found.".format(detect_res.get_objects().shape[0]))
            # do tracking
            ## one problem last: the accumulate error should be aware.
            # 
            if frame_id - self.last_frame_id <= self.MAX_FRAME_DIFF:
                do_tracking(self.last_frame, self.last_det_res, frame, detect_res, self.tracker_type)
            else:
                self.last_frame_id = frame_id
            # print("After Tracking {} objects are found.".format(detect_res.get_objects().shape[0]))
            self.last_frame = frame
            self.last_det_res = detect_res
            
            
        # save the detect_res into cache
        if self.cache and self.target_detect_cache != None and frame_id not in self.target_detect_cache:
            self.target_detect_cache[frame_id] = detect_res
        
        # in the section, we only consider **OJBECTS**
        # when we have all the bbox of current frame, we should select the bbox we are interested.
        protect_bbox, expose_bbox = [], []

        for bbox in detect_res.get_objects():
            in_protect = False
            # if one of these conditions are fulfilled, then we add the current bbox to the protect_bbox
            if Protector.any_condition_fulfill(bbox, self.protect_conditions):
                protect_bbox.append(bbox)
                in_protect = True

            if not in_protect and Protector.any_condition_fulfill(bbox, self.expose_conditions):
                expose_bbox.append(bbox)



        # if no bbox needs to protect
        if len(protect_bbox) == 0 and len(expose_bbox) == 0:
            if self.debug:
                draw_bboxes(cartoon_img, detect_res.get_objects())
            return cartoon_img

        # then we handle the intersections of these bbox.
        modify_bbox_with_IOU(protect_bbox, expose_bbox)
        if self.debug:
            print("Protect bbox", protect_bbox)
            print("Expose bbox", expose_bbox)

        ## expose something
        new_img = expose_IOU(frame, expose_bbox, cartoon_img)

        if len(protect_bbox) > 0:
            # Now we should use our privacy preserving methods to protect video contents.
            # For simplicity, we just do the protect with blurring
            protect_bbox = np.array(protect_bbox)
            sigma_values = scenesize2sigma(protect_bbox[:, RES_PERCENT_IDX])
            bbox_and_sigma = np.hstack((protect_bbox[:, 0:4], sigma_values)).astype(np.int32)
            
            new_img = model_rects(new_img, bbox_and_sigma, effect_type=self.effect_type, enable=False)

        # Finally, return the protected frame.
        if self.debug:
            draw_bboxes(new_img, detect_res.get_objects())
        return new_img
    
    # def get_obj(self, frame, frame_id = 0):

    #     if self.cache and self.target_detect_cache != None and frame_id in self.target_detect_cache:
    #             detect_res = self.target_detect_cache[frame_id]
    #             # print("Use detect cache at frame", frame_id)
    #     else:
    #         # we need to optimize the detect model, because we are confident that detect once is sufficient.
    #         detect_res = detect_for_fxevs(frame)
    #         detect_res.append(detect_for_fxevs(frame, 1))
    #         detect_res.append(detect_face_facenet(frame))
        
        
    #     if self.tracking:
    #         # print("Before Tracking {} objects are found.".format(detect_res.get_objects().shape[0]))
    #         # do tracking
    #         ## one problem last: the accumulate error should be aware.
    #         # 
    #         if frame_id - self.last_frame_id <= self.MAX_FRAME_DIFF:
    #             do_tracking(self.last_frame, self.last_det_res, frame, detect_res, self.tracker_type)
    #         else:
    #             self.last_frame_id = frame_id
    #         # print("After Tracking {} objects are found.".format(detect_res.get_objects().shape[0]))
    #         self.last_frame = frame
    #         self.last_det_res = detect_res
            
            
    #     # save the detect_res into cache
    #     if self.cache and self.target_detect_cache != None and frame_id not in self.target_detect_cache:
    #         self.target_detect_cache[frame_id] = detect_res
    #         # print("save detect result at frame", frame_id)
    #     return detect_res.get_objects()