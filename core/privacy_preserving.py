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




    def process_frame(self, total_model, liscence_model, mtcnn, frame, frame_id = 0):

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
            detect_res = detect_for_fxevs(total_model, frame)
            detect_res.append(detect_for_fxevs(liscence_model, frame, model_type=1))
            detect_res.append(detect_face_facenet(mtcnn, frame))
        
        
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

'''
loss_last_raw_frame = None
loss_last_protected_frame = None
loss_last_raw_det = None
loss_last_protected_det = None
loss_last_frame_id = 0
LOSS_FRAME_DIFF = 60
# In this function, we evaluate the privacy preserving intensity, and the intelligibility loss
def calculate_info_loss(raw_frame, protected_frame, target_class=None, IOU_THRESHOLD = 0.5, tracking = False, frame_id=0, debug=False):
    global loss_last_raw_det, loss_last_raw_frame, loss_last_protected_det, loss_last_protected_frame, loss_last_frame_id
    # if the target_class is None, means we need to compare all the classes appeared in raw_frame
    # for now, we just consider the COCO80 classes.
    # raw_frame_res = detect_for_fxevs(raw_frame).get_objects()
    # protected_frame_res = detect_for_fxevs(protected_frame).get_objects()
    
    raw_frame_res = detect_for_fxevs(raw_frame)
    raw_frame_res.append(detect_for_fxevs(raw_frame, 1))
    raw_frame_res.append(detect_face_facenet(raw_frame))
    raw_frame_res = raw_frame_res.get_objects()
    protected_frame_res = detect_for_fxevs(protected_frame)
    protected_frame_res.append(detect_for_fxevs(protected_frame, 1))
    protected_frame_res.append(detect_face_facenet(protected_frame))
    protected_frame_res = protected_frame_res.get_objects()
    if debug:
        draw_bboxes(raw_frame, raw_frame_res)
        draw_bboxes(protected_frame, protected_frame_res)

    if target_class != None:
        raw_r, protected_r = [], []
        for item in raw_frame_res:
            if item[-2] == target_class or item[-2] == name2classno(target_class):
                raw_r.append(item)
        for item in protected_frame_res:
            if item[-2] == target_class or item[-2] == name2classno(target_class):
                protected_r.append(item)

        raw_frame_res, protected_frame_res = np.array(raw_r), np.array(protected_r)

    if tracking:
        if frame_id - loss_last_frame_id <= LOSS_FRAME_DIFF:
            raw_frame_det_res = DetectRes(raw_frame_res)
            protected_frame_det_res = DetectRes(protected_frame_res)

            print('Before do tracking the raw_frame result\'s size is {}, protected_frame is {}.'\
                    .format(raw_frame_res.shape[0], protected_frame_res.shape[0]))
            # the ground truth also do tracking, 
            do_tracking(loss_last_raw_frame, loss_last_raw_det, raw_frame, raw_frame_det_res)
            do_tracking(loss_last_protected_frame, loss_last_protected_det, protected_frame, protected_frame_det_res)
            raw_frame_res = raw_frame_det_res.get_objects()
            protected_frame_res = protected_frame_det_res.get_objects()

            print('After do tracking the raw_frame result\'s size is {}, protected_frame is {}.'\
                    .format(raw_frame_res.shape[0], protected_frame_res.shape[0]))
        else:
            loss_last_frame_id = frame_id
        loss_last_raw_frame = raw_frame
        loss_last_raw_det = raw_frame_det_res
        loss_last_protected_frame = protected_frame
        loss_last_protected_det = protected_frame_det_res

    # we want to know how many objects are detected respectively.
    raw_detect_cnt, protected_detect_cnt = len(raw_frame_res), len(protected_frame_res)
    # print(f'In raw frame: {raw_detect_cnt} objects are detected.')
    # print(f'In protected frame: {protected_detect_cnt} objects are detected.')

    # then we use the recall ratio to judge the intelligibility loss. 
    # The more target class are detected, the less intelligibility loses.
    selected = set()
    recognized_cnt = 0
    from model_processors.mutils import get_IoU
    for src in raw_frame_res:
        is_detect = False
        for idx, t in enumerate(protected_frame_res):
            if get_IoU(src, t) >= IOU_THRESHOLD and src[-2] == t[-2] and idx not in selected:
                selected.add(idx)
                is_detect = True
                break
        if is_detect:
            recognized_cnt += 1

    # print(f'The object finely detected: {recognized_cnt}/{raw_detect_cnt}.')
    recall = recognized_cnt / raw_detect_cnt if raw_detect_cnt else 0.
    precision = recognized_cnt / protected_detect_cnt if protected_detect_cnt else 0.

    return [raw_detect_cnt, protected_detect_cnt, recognized_cnt, precision, recall]



################## Test code ####################
def test_system_tracker(enable_tracking=True):
    pro = Protector(cartoon=True)
    # pro.debug = True
    if enable_tracking:
        pro.enable_tracking()
    # pro.disable_tracking()
    # pro.cartoon = False
    video_name = 'cabc30fc-e7726578.mov'
    frame_id = 180
    frame0 = cv2.imread('frame/{}/frame_{}.jpg'.format(video_name, frame_id))
    frame1 = cv2.imread('frame/{}/frame_{}.jpg'.format(video_name, frame_id+6))
    if type(frame0) != np.ndarray or type(frame1) != np.ndarray:
        print("Frame open failed.")
        return
    pro.protect_conditions = [['license']]
    pro.expose_conditions = [['car']]

    protect_frame0 = pro.process_frame(frame0)
    protect_frame1 = pro.process_frame(frame1)

    # calculate_info_loss(frame, ret, 'face')
    # cv2.imwrite('output/road_frame_raw.jpg', frame)
    is_tracking = str(pro.tracking)
    #cv2.imwrite(f'output/{video_name}_{is_tracking}_protect_frame0.jpg', protect_frame0)
    #cv2.imwrite(f'output/{video_name}_{is_tracking}_protect_frame1.jpg', protect_frame1)
    cv2.imwrite('output/'+video_name+'_'+is_tracking+'_protect_frame0.jpg', protect_frame0)
    cv2.imwrite('output/'+video_name+'_'+is_tracking+'_protect_frame1.jpg', protect_frame1)

def test_calculate_loss():
    video_name = 'cabc30fc-e7726578.mov'
    #frame0 = cv2.imread(f'frame/{video_name}/frame_180.jpg')
    #frame1 = cv2.imread(f'frame/{video_name}/frame_186.jpg')
    frame0 = cv2.imread('frame/'+str(video_name)+'/frame_180.jpg')
    frame1 = cv2.imread('frame/'+str(video_name)+'/frame_186.jpg')

    pro = Protector()
    cartoon_frame0 = pro.process_frame(frame0)
    cartoon_frame1 = pro.process_frame(frame1)

    if not os.path.exists('debug/test_calculate_loss/'):
        os.makedirs('debug/test_calculate_loss/')

    # cv2.imwrite(f'debug/test_calculate_loss/cartoon_frame0.jpg', cartoon_frame0)
    # cv2.imwrite(f'debug/test_calculate_loss/cartoon_frame1.jpg', cartoon_frame1)
    

    pro.protect_conditions = [['license']]
    pro.expose_conditions = [['car']]

    no_tracking_frame0 = pro.process_frame(frame0)
    no_tracking_frame1 = pro.process_frame(frame1)
    # cv2.imwrite(f'debug/test_calculate_loss/no_tracking_frame0.jpg', no_tracking_frame0)
    # cv2.imwrite(f'debug/test_calculate_loss/no_tracking_frame1.jpg', no_tracking_frame1)

    pro.enable_tracking()
    tracking_frame0 = pro.process_frame(frame0)
    tracking_frame1 = pro.process_frame(frame1)
    # cv2.imwrite(f'debug/test_calculate_loss/tracking_frame0.jpg', tracking_frame0)
    # cv2.imwrite(f'debug/test_calculate_loss/tracking_frame1.jpg', tracking_frame1)

    calculate_info_loss(frame0.copy(), cartoon_frame0, 'license', tracking=True, debug=True)
    calculate_info_loss(frame1.copy(), cartoon_frame1, 'license', tracking=True, debug=True)
    #cv2.imwrite(f'debug/test_calculate_loss/cartoon_protect_frame0.jpg', cartoon_frame0)
    #cv2.imwrite(f'debug/test_calculate_loss/cartoon_protect_frame1.jpg', cartoon_frame1)
    cv2.imwrite('debug/test_calculate_loss/cartoon_protect_frame0.jpg', cartoon_frame0)
    cv2.imwrite('debug/test_calculate_loss/cartoon_protect_frame1.jpg', cartoon_frame1)

    # calculate_info_loss(frame0.copy(), no_tracking_frame0, 'license', tracking=True, debug=True)
    # calculate_info_loss(frame1.copy(), no_tracking_frame1, 'license', tracking=True, debug=True)
    # cv2.imwrite(f'debug/test_calculate_loss/no_tracking_protect_frame0.jpg', no_tracking_frame0)
    # cv2.imwrite(f'debug/test_calculate_loss/no_tracking_protect_frame1.jpg', no_tracking_frame1)

    
    

def tracker_exp():
    pro = Protector(tracking=True)
    # enable cache
    # pro.enable_cache()
    # pro.disable_tracking()
    pro.sampling_rate = 5
    pro.cartoon = False
    pro.sql("SELECT * FROM videos/cabc30fc-e7726578.mov WHERE timestamp = [10,20] PROTECT object='license' EXPOSE object='car'")


def multi_task_exp(steps):
    pro = Protector()
    # enable cache
    pro.enable_cache()
    pro.disable_tracking()
 

    pro.sql("SELECT * FROM videos/car_person_1.mov WHERE timestamp = [10,20] PROTECT people = 'face' EXPOSE object='person'")
    for i in range(steps):
        pro.sql("SELECT * FROM videos/car_person_1.mov WHERE timestamp = [10,20] PROTECT object = 'license' EXPOSE object='car'")
    # pro.sql("SELECT * FROM videos/car_license_1.mov WHERE timestamp = [10,20] PROTECT object = 'license' EXPOSE object='car'")

if __name__ == '__main__':
    import sys

    # multi_task_exp()
    #steps = int(sys.argv[1])
    # steps=8
    # for i in range(2000000):      
    #     multi_task_exp(steps)
    # pro = Protector()
    # pro.sql("SELECT * FROM videos/car_license_2.mov WHERE timestamp = [10,20] PROTECT people = 'license' EXPOSE object='car'")
    # test_calculate_loss(debug=True)

    #test_system_tracker(False)
    #test_system_tracker(True)


    #exit(1)
'''