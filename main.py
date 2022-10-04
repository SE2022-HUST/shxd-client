from concurrent.futures import process
from threading import Thread
from server import start_server, app
import webview



if __name__ == '__main__':
    t = Thread(target=start_server)
    t.daemon = True
    t.start()

    webview.create_window('Video Processor', 
		url='gui/index.html',
		resizable=False,
		width=600,
		height=300
    )
    webview.start(http_server=True)