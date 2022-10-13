from concurrent.futures import process
import string
from threading import Thread
import webview
import os

class Api:
    def fullscreen(self):
        webview.windows[0].toggle_fullscreen()

    def ls(self):
        return os.listdir('.')


def get_entrypoint():
    def exists(path: string):
        return os.path.exists(os.path.join(os.path.dirname(__file__), path))

    if exists('./gui/index.html'):
        return './gui/index.html'

    raise Exception('No index.html found')

if __name__ == '__main__':

    webview.create_window('Video Processor', 
		url='gui/index.html',
		resizable=False,
		width=600,
		height=300,
        js_api=Api()
    )
    webview.start(http_server=True)  #必须使用server模式打开，否则Webview会报错