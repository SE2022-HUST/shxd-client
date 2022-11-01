import cv2
import os

class VideoSampler:
    # So the frame number between two selected frame is skip_frame_cnt
    def __init__(self, path, skip_frame_cnt = 0):
        self.path = path
        self.cap = cv2.VideoCapture(path)
        self.skip_frame_cnt = skip_frame_cnt
        self.frame_idx = 0
        if not self.cap.isOpened():
            print("Video can't be opened.")
    

    ## return the frame_idx and the frame
    # when the frame is invalid, frame_idx equal -1
    def get_next_frame(self):
        if not self.cap.isOpened():
            return -1, None
        
        while self.frame_idx % (self.skip_frame_cnt + 1) != 0:
            self.frame_idx += 1
            state, _ = self.cap.read()
            if not state:
                break
        
        self.frame_idx += 1
        ret, frame = self.cap.read()

        if not ret:
            print('error, none')
            return -1, None
        return self.frame_idx - 1, frame
        
    
    def is_opened(self):
        return self.cap.isOpened()

def frame_to_video(frames, path, fps):
    if not len(frames) or not isinstance(frames, list):
        return False # False
    frame_size = (frames[0].shape[1], frames[0].shape[0])
    # print("The video frame size is ", frame_size, 'FPS', fps)
    
    video_writer = cv2.VideoWriter(path, cv2.VideoWriter_fourcc('X','V','I','D'), fps, frame_size)

    for i, frame in enumerate(frames):
        print("Write", i)
        video_writer.write(frame)

    video_writer.release()
    print(f'The video frame size is {frame_size}, FPS {fps}, save to {path}.')
    return True
    


if __name__ == '__main__':
    dir = 'videos/'
    video_name = 'car_license_1.mov'
    skip = 9
    vs = VideoSampler(dir + video_name, skip_frame_cnt=skip)
    frames = []
    for i in range(100):
        ret, frame = vs.get_next_frame()
        print("frame id", ret)
        if ret == -1:
            break
        frames.append(frame)
        # cv2.imwrite("output/frame_skip" + str(skip) + "_" + str(i) + ".png", frame)
    
    frame_to_video(frames, 'output/test.avi', 3)

