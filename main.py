import string
from threading import Thread
from time import sleep
import webview
import os
import sys
import getopt
import numpy as np
import cv2
from core.video_process import videoProcessing_byframe
# from core.video_process import Video_Processing


class Api:
    def fullscreen(self):
        webview.windows[0].toggle_fullscreen()

    def send_file(self, data: dict):
        
        # print(data['height'])
        # print(data['width'])
        # print(data['data'])
        mat = np.array(data['data'])
        mat = mat.astype(np.uint8)          # for item1 in data['data']:
        #     temp_data = []
        #     for item2 in data['data'][item1]:
        #         temp_data.append(np.array(item2))
        #     mat.append(np.array(temp_data))
        print('mat', mat.dtype)
        # img = cv2.imread('./test.jpg')
        # print('img', img.shape)
        # # cv2.imshow('fuck', mat)
        # cv2.imwrite('./testss.png', img)
        cv2.imwrite('./before.png', mat)
        # img = cv2.imread('./before.png')
        ret_frame = mat
        ret_frame = videoProcessing_byframe(mat, ['license'], ['car'])
        cv2.imwrite('./after.png', ret_frame)
        return ret_frame.tolist()

def get_cmd_arg():
    argv = sys.argv[1:]
    try:
        opts, args = getopt.getopt(argv, "m:",  ["mode="])  # 长选项模式
        for opt, arg in opts:
            if opt in ['-m', '--mode']:
                if(arg == 'debug'):
                    print("Debug Mode On")
                    return True
        return False
    except:
        return False

def get_entrypoint():
    def exists(path: string):
        return os.path.exists(os.path.join(os.path.dirname(__file__), path))
    if get_cmd_arg():
        return 'http://localhost:9000'
    elif exists('./gui/index.html'):
        return './gui/index.html'
    raise Exception('No index.html found')

if __name__ == '__main__':
    # backend = Video_Processing()
    # model = None
    # def run_model():
    #     model = backend.initialize_model()
    #     if(model != None):
    #         backend.warm_up_model()
    #         print("Model Started Success!")
    # t = Thread(target=run_model, daemon=True)
    # t.start()
    webview.create_window('Video Processor', 
		url=get_entrypoint(),
		# resizable=False,
		# width=600,
		# height=300,
        js_api=Api()
    )
    server_on = True
    if(get_cmd_arg()):
        server_on = False
    webview.start(http_server=server_on, gui="edgechromium")  #必须使用server模式打开，否则Webview会报错