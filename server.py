from flask import Flask, request
from flask_cors import cross_origin
import os
import calendar
import time

if not os.path.exists('upload/'):
        os.makedirs('upload/')

app = Flask(__name__)
# app.run(host='127.0.0.1', port=5000, debug=True)

@app.route('/')
def index():
    return "<p>server started</p>"

@app.route('/upload',methods=['POST'])
@cross_origin()
def send_file():
	file = request.files.get('file')
	if file is None:
		# 表示没有发送文件
		return {
			'message':"文件上传失败"
		}
	file_name = file.filename
    # print(file_name)
	# 获取前缀（文件名称）print(os.path.splitext(file_name)[0])
	# 获取后缀（文件类型）print(os.path.splitext(file_name)[-1])
	suffix = os.path.splitext(file_name)[-1]#获取文件后缀（扩展名）
	basePath = os.path.dirname(__file__)  # 当前文件所在路径print(basePath)
	nowTime = calendar.timegm(time.gmtime())#获取当前时间戳改文件名print(nowTime)
	upload_path = os.path.join(basePath, 'upload',str(nowTime))#改到upload目录下# 注意：没有的文件夹一定要先创建，不然会提示没有该路径print(upload_path)
	upload_path = os.path.abspath(upload_path) # 将路径转换为绝对路径print("绝对路径：",upload_path)
	file.save(upload_path + str(nowTime) + suffix)#保存文件
	#http 路径
	url = upload_path + str(nowTime) + str(nowTime) + suffix

	return {
		'code':200,
		'messsge':"文件上传成功",
		'fileNameOld':file_name,
		'fileNameSave':str(nowTime) + str(nowTime) + suffix,
		'url':url
	}

app.run()
