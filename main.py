from concurrent.futures import process
import string
from threading import Thread
from server import start_server, app
import webview
import os

def get_entrypoint():
    def exists(path: string):
        return os.path.exists(os.path.join(os.path.dirname(__file__), path))

    if exists('./gui/index.html'):
        return './gui/index.html'

    raise Exception('No index.html found')

if __name__ == '__main__':
    t = Thread(target=start_server, daemon=True)
    t.start()

    webview.create_window('Video Processor', 
		url='gui/index.html',
		resizable=False,
		width=600,
		height=300
    )
    webview.start(http_server=True)