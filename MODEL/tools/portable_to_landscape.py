'''
The video's frames become portable when some value is changed in the video format.
We should disable the value.
'''
import cv2
from cv2 import rotate
import ffmpeg

def check_rotation(path_video_file):
    # this returns meta-data of the video file in form of a dictionary
    meta_dict = ffmpeg.probe(path_video_file)

    # from the dictionary, meta_dict['streams'][0]['tags']['rotate'] is the key
    # we are looking for
    rotateCode = None

    if 'tags' not in meta_dict['streams'][0] or 'rotate' not in meta_dict['streams'][0]['tags']:
        return rotateCode
    if int(meta_dict['streams'][0]['tags']['rotate']) == 90:
        rotateCode = cv2.ROTATE_90_CLOCKWISE
    elif int(meta_dict['streams'][0]['tags']['rotate']) == 180:
        rotateCode = cv2.ROTATE_180
    elif int(meta_dict['streams'][0]['tags']['rotate']) == 270:
        rotateCode = cv2.ROTATE_90_COUNTERCLOCKWISE

    # print(rotateCode)
    return rotateCode

def correct_rotation(frame, rotateCode):
    return cv2.rotate(frame, rotateCode)



def test_orientation():
    input_file = 'videos/car_license_1.mov'
    import sys
    sys.path.append("./")
    from sampler import VideoSampler
    rotateCode = check_rotation(input_file)

    vs = VideoSampler(input_file)

    ret, frame = vs.get_next_frame()
    if ret == -1:
        return
    frame = correct_rotation(frame, rotateCode)
    cv2.imwrite('tools/debug/0_frame1.jpg', frame)


if __name__ == '__main__':
    test_orientation()
