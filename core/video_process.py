from pathlib import Path
CUR_PATH = Path(__file__).parent
import sys
sys.path.append(CUR_PATH.as_posix())
import torch
import cv2
import numpy as np
import os
import time
from facenet_pytorch import MTCNN
import pickle
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from sampler import VideoSampler, frame_to_video
from privacy_preserving import Protector
from blurring import model_rects
import os

# frame_total_num = 0
frame_cur_num = 0

total_model = torch.hub.load(('./core/yolov5'), 'custom', path='./core/weights/yolov5s.pt', source='local')
license_model = torch.hub.load(('./core/yolov5'), 'custom', path='./core/weights/license_best.pt', source='local')


def video_open(video_path, skip_frame_cnt):
    vs = VideoSampler(video_path, skip_frame_cnt=skip_frame_cnt)
    return vs


# 获得视频的第一帧原始数据，输入是视频文件，输出是numpy_array
def get_first_frame(vs):
    ret, first_frame = vs.get_next_frame()
    height = first_frame.shape[0]
    width = first_frame.shape[1]
    if height > width:
        first_frame = cv2.rotate(first_frame, cv2.ROTATE_90_COUNTERCLOCKWISE)
    return first_frame

# 获得每一帧，加入到list里
def get_every_frame(vs):
    if not vs.is_opened:
        print('Video is not existed!')
        return
    ori_frame_list = []
    while True:
        ret, frame = vs.get_next_frame()
        if ret == -1:
            break
        height = frame.shape[0]
        width = frame.shape[1]
        if height > width:
            frame = cv2.rotate(frame, cv2.ROTATE_90_COUNTERCLOCKWISE)
        ori_frame_list.append(frame)
    return ori_frame_list


# 整个视频处理
def get_objects_by_frame(ori_frame_list, protect_item, expose_item, debug=False):
    pro = Protector()
    pro.protect_conditions = [protect_item]
    pro.expose_conditions = [expose_item]

    frame_cur_num = 0
    pro_frames_objects = []

    for frame in ori_frame_list:
        frame_cur_num += 1
        print(frame_cur_num)
        pro_objects_list = pro.get_objects(total_model, license_model, frame)

        for i in range(len(pro_objects_list)):
            pro_objects_list[i] = pro_objects_list[i].tolist()

        pro_frames_objects.append(pro_objects_list)

        get_process_percent(ori_frame_list, frame_cur_num)
        if debug == True:
            if not os.path.exists(f'./core/debug'):
                os.makedirs(f'./core/debug/')
            tt = 0
            for box in pro_objects_list:
                cv2.imwrite(f'./core/debug/{frame_cur_num}_{tt}.jpg', box)
                tt += 1
    return pro_frames_objects, pro


# 获取进度
def get_process_percent(ori_frame_list, frame_cur_num):
    print(float(frame_cur_num/len(ori_frame_list)))


def video_process_by_frame(img, bbox_and_sigma, judgement):
    new_img = model_rects(img, bbox_and_sigma, judgement=judgement, enable=False)
    return new_img


if __name__ == '__main__':
    vs = video_open('./car_license_2.mov', skip_frame_cnt=150)

    ori_frame_list = get_every_frame(vs)
    pro_frame_list, pro = get_objects_by_frame(ori_frame_list, ['license'], ['car'])
    video_process_by_frame(pro)