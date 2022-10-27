'''
#signle dimension protect#
In this field, we just consider to protect a single dimension of video privacy,
e.g, object protection, person or motion information.
'''
import mutils as mutils
from constant import *
from blurring import blurring_rects
import numpy as np

# We use blurring to protect the object
def protect_object(img, res, objs, enable_people=False, effect_type=0, game=False, num=0, enable=False, copy=False):
    objs_res = []
    # select the object
    for obj in res.get_objects():
        if obj[RES_CLASS_IDX] in objs or mutils.classno2name(obj[RES_CLASS_IDX]) in objs:
            objs_res.append(obj)
    

    if len(objs_res) == 0: return img # no area needs to blur
    objs_res = np.array(objs_res)
    # print(objs_res)
    sigma_values = mutils.scenesize2sigma(objs_res[:, RES_PERCENT_IDX])
    # print("Sigma values")
    # print(sigma_values)

    bbox_and_sigma = np.hstack((objs_res[:, 0:4], sigma_values)).astype(np.int32)

    new_img = blurring_rects(img, bbox_and_sigma, effect_type, game=game, num=num, enable=enable, copy=copy)
    return new_img

# we use GAN to protect face 
def protect_face():
    # first we should get the landmark and mask of person face
    
    return

def output_video(video_path, protect_list, expose_list=None):
    from core.sampler import VideoSampler
    from core.detect import detect_for_fxevs
    fps = 10
    video_sampler = VideoSampler(video_path, fps-1)
    if not video_sampler.is_opened():
        print('Video don\'t exist.')
        return
    frames = []
    t = 0
    objs = list(map(mutils.name2classno, protect_list))
    while 1:
        ret, frame = video_sampler.get_next_frame()
        if not ret:
            break
        res = detect_for_fxevs(frame)
        t += 1
        print("Process frame", t)
        # res.raw_res.save()
        protected_frame = protect_object(frame, res, objs)

        frames.append(protected_frame)

    from core.sampler import frame_to_video
    frame_to_video(frames, 'output/', 'test.avi', int(25 / fps))
    

def test_output_video():
    video_path = 'videos/road.mp4'
    protect_list = ['car']
    
    output_video(video_path, protect_list)


if __name__ == '__main__':
    # test_output_video()



    import cv2
    from core.sampler import VideoSampler
    from core.cartooner import cartoonize
    from core.privacy_preserving import calculate_info_loss
    from core.privacy_preserving import Protector
    from core.protector import protect_object
    from core.detect import detect_for_fxevs


    debug = True
    video_name = 'road2.mov'
    vs = VideoSampler('videos/' + video_name, 10)

    _, frame = vs.get_next_frame()

    res = detect_for_fxevs(frame)

    print(res.get_objects())

    blur_frame = protect_object(frame, res, ['car'])
    cv2.imwrite('output/img.png', blur_frame)


    # from detect import detect_for_fxevs
    # import cv2
    # # img = cv2.imread('images/000000001296.jpg')
    # dir = 'output/'
    # image_name = 'frame_skip10_1.png'
    # img = cv2.imread(dir + image_name)
    # if type(img) == None:
    #     print("Image not exist")
    #     exit(1)

    # res = detect_for_fxevs(img)
    # # print(res.get_objects())
    # objs = ['cell phone', 'person', 'car', 'boat']

    # objs = list(map(mutils.name2classno, objs))

    # print(objs)

    # new_img = protect_object(img, res, objs)

    # cv2.imwrite('output/img.png', new_img)