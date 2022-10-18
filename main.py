import string
from threading import Thread
from time import sleep
import webview
import os
import sys
import getopt
# from core.video_process import Video_Processing

class Api:
    def fullscreen(self):
        webview.windows[0].toggle_fullscreen()

    def send_file(self, data: dict):
        print(data.keys())
        print(data['data'])
        print(data['height'])
        print(data['width'])
        sleep(1)
        return data

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
    webview.start(http_server=server_on)  #必须使用server模式打开，否则Webview会报错