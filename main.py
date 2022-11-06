import os
import sys
import getopt

import string
import webview
import numpy as np
from core.video_process import video_open, get_first_frame, get_objects_by_frame, get_every_frame


class Api:
    def __init__(self):
        self.vs = None
        self.first_frame = None
        self.ori_frame_list = []
        self.video_path = ''
        self.all_frame_objects = []

    # 从前端接收一帧
    def send_frame(self, data: dict):
        frame = np.array(data['data'])
        frame = frame.astype(np.uint8)
        return frame.tolist()

    def send_chosen_entities(self, data: list):
        self.set_progress(10)
        print(data)

    # 从本地选择视频上传并获得视频所在路径 返回前端第一帧
    def get_video(self):
        file_types = ('MOV Files (*.mov)',
                      'MP4 Files (*.mp4)')
        res = webview.windows[0].create_file_dialog(
            dialog_type=webview.OPEN_DIALOG,
            file_types=file_types
        )
        self.video_path = res[0].replace("\\", "\\\\")
        print(self.video_path)
        self.vs = video_open(self.video_path, 80)
        self.first_frame = get_first_frame(self.vs)
        print('sample finished')
        return self.first_frame.tolist()

    def get_entities(self):
        self.ori_frame_list = get_every_frame(self.vs)
        self.all_frame_objects = get_objects_by_frame(
            self.ori_frame_list, ['license'], ['car'])
        return self.all_frame_objects

    def get_save_path(self):
        file_types = ('MOV Files (*.mov)',
                      'MP4 Files (*.mp4)', 'All Files (*.*)')
        res = webview.windows[0].create_file_dialog(
            dialog_type=webview.SAVE_DIALOG,
            file_types=file_types,
            save_filename='output'
        )
        print(res)
        return res

    def set_progress(self, p):
        self.progress = p
        webview.windows[0].evaluate_js(
            'window.pywebview.state.setProgress(%d)' % (self.progress))

    def test(self):
        self.set_progress(60)


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
    try:
        opts = getopt.getopt(argv, "m:",  ["mode="])  # 长选项模式
        for opt, arg in opts:
            if (opt in ['-m', '--mode']):
                if (arg == 'debug'):
                    print("Debug Mode On")
                    return True
        return False
    except:
        return False


def main():
    debug = True
    webview.create_window('Video Processor',
                          url=get_entrypoint(debug),
                          # resizable=False,
                          width=1500,
                          height=1000,
                          js_api=Api()
                          )
    webview.start(http_server=True, gui="edgechromium",
                  debug=debug)  # 必须使用server模式打开，否则Webview会报错


if __name__ == '__main__':
    main()
