import os
import sys
import getopt
import cv2
import platform
import subprocess
import string
import time
import webview
import numpy as np
from core.sampler import frame_to_video
from core.video_process import video_open, get_first_frame, get_objects_by_frame, get_every_frame, video_process_by_frame
from core.privacy_preserving import Protector


class Api:
    def __init__(self):
        self.vs = None
        self.first_frame = None
        self.ori_frame_list = []
        self.video_path = ''
        self.all_frame_objects = []
        self.save_path = ''
        self.pro_model = None
        self.judge_data = []
        self.cur_frame = []

    def send_chosen_entities(self, data: list):
        self.set_progress(0)  # 在上传实体的时候清零进度
        self.judge_data = data
        print('start!')
        self.video_process()
        print(data)

    # 从本地选择视频上传并获得视频所在路径 返回前端第一帧

    def get_video(self, shift=-1):
        # 默认值
        if shift == None:
            shift = -1
        skip_frame_cnt = 90

        if shift > 0:
            if shift == 1:  skip_frame_cnt = 30
            elif shift == 2:    skip_frame_cnt = 60
            elif shift == 3:    skip_frame_cnt = 90

        file_types = ('MOV Files (*.mov)',
                      'MP4 Files (*.mp4)')
        res = webview.windows[0].create_file_dialog(
            dialog_type=webview.OPEN_DIALOG,
            file_types=file_types
        )
        self.video_path = res[0].replace("\\", "\\\\")
        print(self.video_path)
        self.vs = video_open(self.video_path, skip_frame_cnt=skip_frame_cnt)
        self.first_frame = get_first_frame(self.vs)
        print('sample finished')
        return self.first_frame.tolist()


    def get_entities(self):
        self.all_frame_objects = []
        protect_item = ['license']
        expose_item = ['car']
        self.ori_frame_list = get_every_frame(self.vs)
        # self.all_frame_objects, self.pro_model = get_objects_by_frame(
        #     self.ori_frame_list, ['license'], ['car'])
        self.pro_model = Protector()
        self.pro_model.protect_conditions = [protect_item]
        self.pro_model.expose_conditions = [expose_item]
        frame_cur_num = 0
        length = len(self.ori_frame_list)

        for frame in self.ori_frame_list:
            frame_cur_num += 1
            print(frame_cur_num)
            pro_objects_list, self.pro_model = get_objects_by_frame(
                frame, self.pro_model)
            self.set_loading_progress(float(frame_cur_num/length)*100)
            # print('##########', float(frame_cur_num/length)*100)
            self.all_frame_objects.append(pro_objects_list)

        return self.all_frame_objects

    def get_cur_frame(self):
        return self.cur_frame

    def get_save_path(self):
        file_types = ('AVI Files (*.avi)', 'All Files (*.*)')
        now = int(round(time.time()*1000))
        res = webview.windows[0].create_file_dialog(
            dialog_type=webview.SAVE_DIALOG,
            file_types=file_types,
            save_filename=time.strftime(
                '%Y-%m-%d-%H-%M-%S', time.localtime(now/1000)))
        print(res)
        self.save_path = res
        return res

    def set_progress(self, p: int):
        self.progress = p
        webview.windows[0].evaluate_js(
            'window.pywebview.state.setProgress(%d)' % (self.progress))

    def set_loading_progress(self, p: int):
        webview.windows[0].evaluate_js(
            'window.pywebview.state.setLoadProcess(%d)' % (p))

    def video_process(self):
        if len(self.pro_model.bboxes_list) != len(self.pro_model.new_imgs_list):
            print('Length is not equal! Maybe something is wrong!')
            return
        print('Begin!')
        pro_new_images = []
        length = len(self.pro_model.new_imgs_list)
        for i in range(length):
            self.set_progress(float(i/length)*100)
            new_img = video_process_by_frame(
                self.pro_model.new_imgs_list[i], self.pro_model.bboxes_list[i], self.judge_data[i])
            self.cur_frame = new_img.tolist()
            # cv2.imwrite(f'./debug_{i}.jpg', new_img)
            pro_new_images.append(new_img)
        frame_to_video(pro_new_images, self.save_path, length/25)
        self.set_progress(100)
        return

    def open_fp(self, path):
        fp = path
        systemType: str = platform.platform()
        if 'mac' in systemType:
            fp: str = fp.replace("\\", "/")
            subprocess.call(["open", fp])
        else:
            fp: str = fp.replace("\\", "\\\\")
            os.startfile(fp)

    def video_compress(self):
        self.ori_frame_list = get_every_frame(self.vs)
        length = len(self.ori_frame_list)
        frame_to_video(self.ori_frame_list, self.save_path, length/25)
        self.set_progress(100)
        return


# 根据运行模式选择入口


def get_entrypoint(debug: bool):
    def exists(path: string):
        return os.path.exists(os.path.join(os.path.dirname(__file__), path))
    if debug:
        return 'http://localhost:9000'
    elif exists('./gui/index.html'):
        return './gui/index.html'
    raise Exception('No index.html found')

# 解析命令行参数


def verify_debug():
    argv = sys.argv[1:]
    print(argv)
    try:
        opts, args = getopt.getopt(argv, "m:",  ["mode="])  # 长选项模式
        for opt, arg in opts:
            if (opt in ['-m', '--mode']):
                if (arg == 'debug'):
                    print("Debug Mode On")
                    return True
        return False
    except:
        return False


def main():
    debug = verify_debug()
    webview.create_window('Video Processor',
                          url=get_entrypoint(debug),
                          # resizable=False,
                          width=1000,
                          height=700,
                          js_api=Api()
                          )
    webview.start(http_server=True, gui="edgechromium",
                  debug=True)  # 必须使用server模式打开，否则Webview会报错


if __name__ == '__main__':
    main()
