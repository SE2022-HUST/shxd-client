from detect import Tracker
import os
import cv2
import pandas as pd
from constant import *
from mutils import *
from detect import draw_bboxes
## dataset MOT-16
# input: video_path
# output: precision and recall ?
def eval_tracking(video_path, gt_path, tracking=True, target_object='person', IOU_THRESHOLD=0.5, debug=False):
    
    files = os.listdir(video_path)
    files.sort()
    tracker = Tracker()

    ground_truth = pd.read_csv(gt_path, header=None)
    dir = 'output/tracking_eval/'
    if not os.path.exists(dir):
        os.makedirs(dir)
    filename = video_path.split('/')[-3] + str(tracking) + '.txt'
    file = open(dir + filename, 'w')

    for i, file_name in enumerate(files):
        # if i > 10: break
        print(i, file_name)
        frame = cv2.imread(video_path + file_name)
        res = tracker.detect_with_track(frame, i, tracking=tracking, target_object=target_object).get_objects()

        o_type = 1 if target_object == 'person' else 3
        gt = ground_truth[(ground_truth[0] == (i+1)) & (ground_truth[7] == o_type)].values.astype(np.int32)[:, 2:7]

        gt[:, 2] += gt[:, 0]
        gt[:, 3] += gt[:, 1]

        if debug:
            gt_frame = frame.copy()
            draw_bboxes(frame, res)
            draw_bboxes(gt_frame, gt)

            if not os.path.exists('debug/tracking_eval/'):
                os.makedirs('debug/tracking_eval/')
            cv2.imwrite(f'debug/tracking_eval/det_frame_{i}.jpg', frame)
            cv2.imwrite(f'debug/tracking_eval/gt_frame_{i}.jpg', gt_frame)
        # print('frame {}, gt {}'.format(i+1, gt))

        # compare gt with res
        gt_cnt, det_cnt = len(gt), len(res)

        selected = set()
        recognized_cnt = 0
        for src in res:
            is_detect = False
            for idx, t in enumerate(gt):
                if get_IoU(src, t) >= IOU_THRESHOLD and idx not in selected:
                    selected.add(idx)
                    is_detect = True
                    break
            if is_detect:
                recognized_cnt += 1

        recall = recognized_cnt / gt_cnt if gt_cnt else 0.
        precision = recognized_cnt / det_cnt if det_cnt else 0.
        file.write(f'{i},{gt_cnt},{det_cnt},{recognized_cnt},{precision},{recall}\n')

    file.close()





if __name__ == '__main__':
    video_path = '../../dataset/MOT16/train/MOT16-11/img1/'
    gt_path = '../../dataset/MOT16/train/MOT16-11/gt/gt.txt'
    eval_tracking(video_path, gt_path, tracking=False)
    