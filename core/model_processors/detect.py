import sys
from pathlib import Path

from wandb import Video
FILE = Path(__file__).resolve()
ROOT = FILE.parents[0]  # YOLOv5 root directory
if str(ROOT) not in sys.path:
    sys.path.append(str(ROOT))  # add ROOT to PATH

from numpy.core.shape_base import hstack
import torch
import cv2
import numpy as np
from model_processors.constant import *
from model_processors.mutils import X, classno2name, name2classno
from model_processors.mutils import *
import os

total_model = torch.hub.load((ROOT/ 'yolov5').as_posix(), 'custom', path=ROOT / 'weights/yolov5s.pt', source='local')
license_model = torch.hub.load((ROOT / 'yolov5').as_posix(), 'custom', path=ROOT / 'weights/license_best.pt', source='local')

def detect(img, model_type = 0):
    if model_type == 0:
        results = total_model(img)
    else:
        results = license_model(img)
    return results


# result format [(x, y, x, y, confidence, class, name), ....]
def detect_to_pandas(img):
    results = total_model(img)
    return results.pandas().xyxy[0]


# we need to rearrange the result.
# some attributes are neccessary for us.
# the result contain [x, y(top left), x, y(bottom right), class_no, percent_in_img*1000]
def detect_for_fxevs(img, model_type=0, draw_bbox=False):
    if model_type == 0:
        results = total_model(img)
    else:
        results = license_model(img)
    # results.save()
    x = results.pandas().xyxy[0]
    # print(x.head())
    x = x[['xmin', 'ymin', 'xmax', 'ymax', 'class']].values
    
    if draw_bbox:
        draw_bboxes(img, x)
    
    if model_type == 1:
        x[:,4] = x[:,4] + 80
        # print("detect license, len", x.shape[0])
        # print("Detct res is ", x)
    # print(x)
    res = x
    per_in_img = get_percent_in_image(res, img)

    # print(per_in_img)
    res = np.hstack((x, per_in_img)).astype(np.int32)
    # print(res)
    return DetectRes(res)

import dlib
detector = dlib.get_frontal_face_detector() 

def detect_face(img):
    # In this function, we use dlib to detect human face
    dlib_img = np.array(img[:,:,:], dtype=np.uint8)

    dets = detector(dlib_img, 1)
    ret = []
    face_no = name2classno('face')
    for i, d in enumerate(dets):
        # print("Detection {}: Left: {} Top: {} Right: {} Bottom: {}".format(
        #     i, d.left(), d.top(), d.right(), d.bottom()))
            ret.append([d.left(), d.top(), d.right(), d.bottom(), face_no])
        
    x = np.array(ret)
    per_in_img = get_percent_in_image(x, img)
    # print(per_in_img)
    res = np.hstack((x, per_in_img)).astype(np.int32)
    # print(res)
    return DetectRes(res)
        

from facenet_pytorch import MTCNN
from PIL import Image

device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')
mtcnn = MTCNN(keep_all=True, device=device)
def detect_face_facenet(img):
    frame = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

    boxes, _ = mtcnn.detect(frame)
    if type(boxes) != np.ndarray:
        return DetectRes(np.array([]))
    cls = np.array([name2classno('face')] * len(boxes))
    cls = cls.reshape((len(boxes), 1))
    # print('cls.shape:', cls.shape)
    per_in_img = get_percent_in_image(boxes, img)
    
    res = np.hstack((boxes, cls, per_in_img)).astype(np.int32)
    # print("In detect_face_facenet")
    # print(res)
    return DetectRes(res)
    


def draw_bboxes(img, x):
    if type(x) != np.ndarray or x.shape[0] == 0:
        return
    font = cv2.FONT_HERSHEY_SCRIPT_SIMPLEX
    # the draw all the bbox in the img
    for xmin, ymin, xmax, ymax, cls in x[:, 0:5].astype(np.int32):
        cv2.rectangle(img, (xmin, ymin), (xmax, ymax), (0, 255, 0), 2)
        cv2.putText(img, str(cls), (xmin, ymin), font, 0.8, (0, 255, 0), 2)


def get_percent_in_image(x, img):
    per_in_img = (x[:, 2] - x[:, 0]) * (x[:, 3] - x[:, 1]) / (img.shape[0] * img.shape[1]) * ZOOM_SCALE
    per_in_img = per_in_img.reshape((per_in_img.shape[0], 1))
    return per_in_img


def do_tracking(last_frame, last_det_res, frame, detect_res, tracker_type='CSRT'):
        if type(last_frame) != np.ndarray:
            print("last frame was not found. At do_tracking().")
            return

        IOU_THRES = 0.1
        DIS_THRES = 70
        omitted_bboxes = []
        # we should compare each bbox, and find the omitted bbox. we should handle the edge cases.
        for bbox in last_det_res.get_objects():
            is_found = False
            for bbox_now in detect_res.get_objects():
                if DetectRes.get_class(bbox) != DetectRes.get_class(bbox_now):
                    continue
                if get_IoU(bbox, bbox_now) >= IOU_THRES or get_distance(bbox, bbox_now) < DIS_THRES:
                    is_found = True
                    break
            if not is_found:
                omitted_bboxes.append(bbox)
        
        ret_bbox = []
        # every ommited bbox should do the tracking respectively.
        for obbox in omitted_bboxes:
            if obbox[2]-obbox[0] < 5 or obbox[3]-obbox[1] < 5 or obbox[0] < 0 \
                or obbox[1] < 0 or obbox[2] > frame.shape[0] or obbox[3] > frame.shape[1]:
                continue
            tracker = createTrackerByName(tracker_type)
            # print(self.last_frame)
            # print(obbox)
            tracker.init(last_frame, (obbox[0], obbox[1], obbox[2]-obbox[0], obbox[3]-obbox[1]))

            ok, bbox = tracker.update(frame)

            if ok:
                new_box = obbox.copy()
                new_box[0], new_box[1], new_box[2], new_box[3] = max(0, bbox[0]), max(0, bbox[1]), min(bbox[0]+bbox[2], frame.shape[0]), min(bbox[1]+bbox[3], frame.shape[1])
                ret_bbox.append(new_box)
            else:
                print("Track fail at", obbox)
        
        if len(ret_bbox) == 0:
            print("No object need to track.")
            return

        ret_bbox = np.array(ret_bbox)
        
        if detect_res.objects.shape[0] == 0:
            detect_res.objects = ret_bbox
        else:
            detect_res.objects = np.vstack((detect_res.objects, ret_bbox))




trackerTypes = ['BOOSTING', 'MIL', 'KCF','TLD', 'MEDIANFLOW', 'GOTURN', 'MOSSE', 'CSRT']
def createTrackerByName(trackerType):
  # Create a tracker based on tracker name
  if trackerType == trackerTypes[0]:
    tracker = cv2.TrackerBoosting_create()
  elif trackerType == trackerTypes[1]:
    tracker = cv2.TrackerMIL_create()
  elif trackerType == trackerTypes[2]:
    tracker = cv2.TrackerKCF_create()
  elif trackerType == trackerTypes[3]:
    tracker = cv2.TrackerTLD_create()
  elif trackerType == trackerTypes[4]:
    tracker = cv2.TrackerMedianFlow_create()
  elif trackerType == trackerTypes[5]:
    tracker = cv2.TrackerGOTURN_create()
  elif trackerType == trackerTypes[6]:
    tracker = cv2.TrackerMOSSE_create()
  elif trackerType == trackerTypes[7]:
    tracker = cv2.TrackerCSRT_create()
  else:
    tracker = None
    print('Incorrect tracker name')
    print('Available trackers are:')
    for t in trackerTypes:
      print(t)

  return tracker


class Tracker:

    def __init__(self, frame_diff=30):
        self.last_frame = None
        self.last_frame_id = 0
        self.last_det_res = None
        self.FRAME_DIFF = frame_diff
    

    def detect_with_track(self, frame, frame_id=0, tracking=True, target_object=None):
        det_res = detect_for_fxevs(frame)
        det_res.append(detect_for_fxevs(frame, 1))
        det_res.append(detect_face_facenet(frame))

        if target_object != None:
            det_list = []
            for item in det_res.get_objects():
                if item[-2] == target_object or item[-2] == name2classno(target_object):
                    det_list.append(item)

            det_res.objects = np.array(det_list)
        
        if not tracking:
            return det_res

        if frame_id - self.last_frame_id <= self.FRAME_DIFF:
            do_tracking(self.last_frame, self.last_det_res, frame, det_res)
        else:
            self.last_frame_id = frame_id
        
        self.last_frame = frame
        self.last_det_res = det_res

        return det_res





class DetectRes:
    # We need to store the object related result
    def __init__(self, res):
        self.objects = res
        

    def get_objects(self):
        return self.objects

    def append(self, dres):
        if self.objects.shape[0] == 0:
            self.objects = dres.objects
        elif dres.objects.shape[0] != 0:
            self.objects = np.vstack((self.objects, dres.objects))
        
    def get_class(item):
        return item[RES_CLASS_IDX]
    
    def get_percent(item):
        return item[RES_PERCENT_IDX]


def test_tracker():
    video_name = 'cabc30fc-e7726578.mov'
    frame0 = cv2.imread(f'frame/{video_name}/frame_180.jpg')
    frame1 = cv2.imread(f'frame/{video_name}/frame_186.jpg')

    tr = Tracker()

    r1 = tr.detect_with_track(frame0)
    r2 = tr.detect_with_track(frame1)

    draw_bboxes(frame0, r1.get_objects())
    draw_bboxes(frame1, r2.get_objects())

    dir = 'debug/test_tracker/'
    if not os.path.exists(dir):
        os.makedirs(dir)

    cv2.imwrite(dir + 'frame0.jpg', frame0)
    cv2.imwrite(dir + 'frame1.jpg', frame1)
    

if __name__ == '__main__':
    test_tracker()
    
    # img = cv2.imread('images/person.jpg')
    # # img2 = cv2.imread('images/1test.jpg')
    # if type(img) == None:
    #     print("Image not exist.")
    #     exit(0)

    # ret = detect_face_facenet(img)

    # for box in ret.get_objects():
    #     print(box)
    #     x, y, x1, y1 = box[0:4]
        
    #     cv2.rectangle(img, (x, y), (x1, y1), (0, 255, 0), 2)

    # # print(ret)

    # # res = detect_for_fxevs(img, 0, True)

    # cv2.imwrite('output/person.jpg', img)

    
    
    # dets = detect_face(img)

    # print(dets.get_objects())
    # for x1, y1, x2, y2, _ in dets:
    #     h, w = y2 - y1, x2 - x1
    #     iou = img[y1:y1+h, x1:x1+w]
    #     cv2.imwrite('output/face' + str(x1) + '.jpg', iou);
    # res = detect_for_fxevs(img)
    
    # res2 = detect_for_fxevs(img2, 1)

    # print(res.get_objects())
    # print(res2.get_objects())
    # res.show()
    # res = res.pandas().xyxy[0]
    # pf = res.pandas().xyxy[0].values

    # rects = pf[:, 0:4]
    
    # pf.head()
    # res.print()
    # res.save('output/')
