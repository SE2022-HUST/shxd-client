import sys
from pathlib import Path
CUR_PATH = Path(__file__).parent
sys.path.append(CUR_PATH.as_posix())
from pickle import FALSE
import cv2
from sampler import VideoSampler, frame_to_video
from cartooner import cartoonize
from privacy_preserving import Protector
from detect import detect_for_fxevs
import os

def videoProcessing(video_name, protect_item, expose_item, skip_frame_cnt=0, debug=False, inputdir=os.path.abspath('./core/dataset/car/')):

    fps = 10
    input_dir = inputdir + '\\'
    print(video_name, input_dir)

    vs = VideoSampler(input_dir + video_name, skip_frame_cnt=skip_frame_cnt)
    if not vs.is_opened:
        return
    
    pro = Protector()
    pro.protect_conditions = [protect_item]
    pro.expose_conditions = [expose_item]

    pro_frame_list = []

    if not os.path.exists(f'./core/output/{video_name}'):
        os.makedirs(f'./core/output/{video_name}')

    tt = 1
    while 1:
        ret, frame = vs.get_next_frame()
        if ret == -1:
            break
        frame = cv2.rotate(frame, cv2.ROTATE_90_COUNTERCLOCKWISE)

        pro_frame = pro.process_frame(frame)
        res = detect_for_fxevs(frame)
        pro_frame_list.append(pro_frame)

        if debug:
            if not os.path.exists(f'./core/debug/{video_name}'):
                os.makedirs(f'./core/debug/{video_name}/')
            if not os.path.exists(f'./core/debug/{video_name}/{protect_item}_{expose_item}'):
                os.makedirs(f'./core/debug/{video_name}/{protect_item}_{expose_item}')
            # cv2.imwrite(f'./core/debug/{video_name}/{protect_item}_{expose_item}/frame_{tt}.jpg', frame)
            cv2.imwrite(f'./core/debug/{video_name}/{protect_item}_{expose_item}/pro_frame_{tt}.jpg', pro_frame)
            print(f'{tt} is done')
        tt += 1

    frame_to_video(pro_frame_list, f'./{video_name[:-4]}.avi', int(25 / fps))

if __name__ == '__main__':
    videoProcessing('car_license_5.mov', ['license'], ['car'], skip_frame_cnt=25, debug=True)