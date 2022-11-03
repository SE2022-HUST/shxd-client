import string
from threading import Thread
from time import sleep
import webview
import os
import sys
import getopt
import numpy as np
import cv2
from core.video_process import videoProcessing_byframe, videoProcessing
import time
# from core.video_process import Video_Processing

class Api:
    def fullscreen(self):
        webview.windows[0].toggle_fullscreen()
    
    def send_file(self, data: dict):
        s = time.time()
        mat = np.array(data['data'])
        mat = mat.astype(np.uint8)
        ret_frame = videoProcessing_byframe(mat, ['license'], ['car'])
        print(time.time()-s)
        cv2.imwrite('./after.png', ret_frame)
        print(time.time()-s)
        return ret_frame.tolist()
    
    def open_file_fialog(self):
        file_types = ('Video Files (*.mov)', 'All File (*.mp4)')
        res = webview.windows[0].create_file_dialog(
            dialog_type=webview.OPEN_DIALOG,
            file_types=file_types
        )
        print(res[0])
        # video_name = res[0].split('\\')[-1]
        # print(video_name)
        videoProcessing(res[0], ['license'], ['car'], skip_frame_cnt=50)

def get_entrypoint(debug: bool):
    def exists(path: string):
        return os.path.exists(os.path.join(os.path.dirname(__file__), path))
    if debug:
        return 'http://localhost:9000'
    elif exists('./gui/index.html'):
        return './gui/index.html'
    raise Exception('No index.html found')

def verify_debug():
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

def main():
    debug = verify_debug()
    webview.create_window('Video Processor', 
		url=get_entrypoint(debug),
		# resizable=False,
		width=1000,
		height=800,
        js_api=Api()
    )
    webview.start(http_server=True, gui="edgechromium", debug=debug)  #必须使用server模式打开，否则Webview会报错

if __name__ == '__main__':
    main()