from concurrent.futures import process
from threading import Thread
import webview
from flask import Flask, request
from flask_cors import cross_origin
import os
import calendar
import time
import sys
from pathlib import Path
CUR_PATH = Path(__file__).parent
sys.path.append(CUR_PATH.as_posix())
from core.main import videoProcessing


save_fold = 'upload'
save_dir = save_fold+'/'

if not os.path.exists(save_dir):
        os.makedirs(save_dir)

app = Flask(__name__)

@app.route('/')
def index():
    return "<p>server started</p>"

@app.route('/'+save_fold,methods=['POST'])
@cross_origin()


def send_file():
	file = request.files.get('file')
	if file is None:
		return {
			'message':"No valid file"
		}
	file_name = file.filename
	suffix = os.path.splitext(file_name)[-1]#获取文件后缀（扩展名）
	basePath = os.path.dirname(__file__)  # 当前文件所在路径print(basePath)


	nowTime = calendar.timegm(time.gmtime())#获取当前时间戳改文件名print(nowTime)
	upload_path = os.path.join(basePath, save_fold, str(nowTime))#改到upload目录下# 注意：没有的文件夹一定要先创建，不然会提示没有该路径print(upload_path)
	upload_path = os.path.abspath(upload_path) # 将路径转换为绝对路径print("绝对路径：",upload_path)
	# file.save(upload_path + str(nowTime) + suffix)#保存文件

	process_dict = {'protect_item':['license'], 'expose_item':['car']}
	videoProcessing(file_name, process_dict['protect_item'], process_dict['expose_item'], inputdir=os.path.abspath(basePath))

	#http 路径
	url = upload_path + str(nowTime) + str(nowTime) + suffix
	return {
		'code':200,
		'messsge':"File received",
		'fileNameOld':file_name,
		'fileNameSave':str(nowTime) + str(nowTime) + suffix,
		'url':url
	}

def start_server():
    app.run(host='127.0.0.1', port=5000, threaded=True)



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