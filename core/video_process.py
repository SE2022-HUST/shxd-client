from msilib.schema import Error
import sys
from pathlib import Path
CUR_PATH = Path(__file__).parent
sys.path.append(CUR_PATH.as_posix())
import cv2
import time
import torch
import numpy as np
import pickle
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from model_processors.sampler import VideoSampler, frame_to_video
from model_processors.cartooner import cartoonize
from model_processors.privacy_preserving import Protector
from model_processors.detect import get_percent_in_image
# import os
# import socket
# from utils import SocketCommunication
# import multiprocessing as mp


def videoProcessing_byframe(frame, protect_item, expose_item):
    pro = Protector()
    pro.protect_conditions = [protect_item]
    pro.expose_conditions = [expose_item]
    pro_frame = pro.process_frame(frame)
    return pro_frame

'''
def videoProcessing(video_name, protect_item, expose_item, skip_frame_cnt=0, debug=False, inputdir=os.path.abspath('./core/dataset/car/')):

    fps = 10
    input_dir = inputdir + '\\'
    print(video_name, input_dir)

    vs = VideoSampler(input_dir + video_name, skip_frame_cnt=skip_frame_cnt)
    if not vs.is_opened:
        return
    
    pro = Protector()
    pro.protect_conditions = [protect_item]
    pro.expose_conditions = [expose_item]

    pro_frame_list = []

    if not os.path.exists(f'./core/output/{video_name}'):
        os.makedirs(f'./core/output/{video_name}')

    tt = 1
    while True:
        ret, frame = vs.get_next_frame()
        if ret == -1:
            break
        frame = cv2.rotate(frame, cv2.ROTATE_90_COUNTERCLOCKWISE)

        pro_frame = pro.process_frame(frame)
        res = detect_for_fxevs(frame)
        pro_frame_list.append(pro_frame)

        if debug:
            if not os.path.exists(f'./core/debug/{video_name}'):
                os.makedirs(f'./core/debug/{video_name}/')
            if not os.path.exists(f'./core/debug/{video_name}/{protect_item}_{expose_item}'):
                os.makedirs(f'./core/debug/{video_name}/{protect_item}_{expose_item}')
            # cv2.imwrite(f'./core/debug/{video_name}/{protect_item}_{expose_item}/frame_{tt}.jpg', frame)
            cv2.imwrite(f'./core/debug/{video_name}/{protect_item}_{expose_item}/pro_frame_{tt}.jpg', pro_frame)
            print(f'{tt} is done')
        tt += 1

    frame_to_video(pro_frame_list, f'./{video_name[:-4]}.avi', int(25 / fps))

if __name__ == '__main__':
    videoProcessing('car_license_5.mov', ['license'], ['car'], skip_frame_cnt=25, debug=False)
'''

# class Video_Processing(mp.Process):

#     def __init__(self, protect_item, expose_item, cuda_index, shared_queue, ins_index):
#         self.protect_item = protect_item
#         self.expose_item = expose_item
#         self.pro = Protector()
#         self.pro.protect_conditions = [self.protect_item]
#         self.pro.expose_conditions = [self.expose_item]
#         self.sender_socket_path = "./tmp/send_result/" + ins_index
#         self.input_queue = shared_queue
#         self.cuda_index = cuda_index
#         self.sock_tools = SocketCommunication()
#         self.stop_event = mp.Event()
#         self.transfer = ThreadPoolExecutor(max_workers=10)

#     def get_req_from_loadbalancer(self):
#         """
#         get requests from the load balance
#         Returns:
#         """
#         result = []
#         request_info = []
#         while True:
#             try:
#                 temp = self.input_queue.get(block=False)
#             except Exception as e:
#                 break
#             if temp is None:
#                 continue
#             data = np.load(temp[0],allow_pickle=True)
#             result.append(data)
#             request_info.append(temp)
#             break
#         return result[0], request_info[0]

#     def socket_to_sender(self, record):
#         try:
#             client = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
#             client.connect(self.sender_socket_path)
#             upload_json = pickle.dumps(record)
#             self.sock_tools.send_data_bytes(client, upload_json)
#         except Exception as e:
#             print("socket send errors",e)

#     def initialize_model(self):
#         model = None
#         try:
#             model = torch.hub.load(('./yolov5').as_posix(), 'custom', path='./weights/yolov5s.pt', source='local')
#             torch.cuda.set_device(torch.device('cuda:' + str(self.cuda_index)))
#             model.to("cuda:" + str(self.cuda_index))
#         except Exception as e:
#             print("error happens when creating the object of DNNs", self.model_name, e)
#         print("create model instance")
#         return model

#     def warm_up_model(self, model):
#         warm_up_counts = 0
#         warm_up = True
#         input_data = torch.rand(1, 3, 244, 244)
#         while warm_up:
#             try:
#                 start = time.time()
#                 result = model(input_data)
#                 end = time.time()
#                 delay = end - start
#                 if abs(round(delay) - self.target_latency) <= 3 or warm_up_counts > 30:
#                     self.init_end_event.value = 1
#                     self.load_balancer_signal.value = 1
#                     warm_up = False
#                     break
#                 warm_up_counts = warm_up_counts + 1
#             except Exception as e:
#                 print("-----warm up the instance fails------", e)
#         return warm_up

#     def run(self):
        
#         model = self.initialize_model()
#         if model is None:
#             return
#         warm_up = True

#         while True:
#             if self.stop_event.is_set():
#                 break
#             if warm_up:
#                 warm_up = self.warm_up_model(model)

#             input_batch, batch_info = self.get_req_from_loadbalancer()
#             if input_batch is None:
#                 continue
#             try:
#                 pro_frame = self.pro.process_frame(input_batch)
#                 results = model(input_batch)
#                 x = results.pandas().xyxy[0]
#                 x = x[['xmin', 'ymin', 'xmax', 'ymax', 'class']].values
#                 res = x
#                 per_in_img = get_percent_in_image(res, input_batch)

#                 res = np.hstack((x, per_in_img)).astype(np.int32)
#             except Exception as e:
#                 print("==== process data errors===", e, self.start_layer, self.end_layer)
#                 continue

#             result = res.clone()
#             data = result.cpu()
#             batch_info['output'] = data
#             try:
#                 self.transfer.submit(self.socket_to_sender, batch_info)
#             except Exception as e:
#                 print("send data to sender errors", e)

#     def stop(self):
#         print("closing instance", self.ins_index)
#         self.transfer.shutdown()
#         self.stop_event.set()


# class ResultSender(mp.Process):
#     def __init__(self, unix_socket_path):
#         super().__init__()
#         self.unix_socket_path = unix_socket_path
#         self.socket_tool = SocketCommunication()
#         self.CLIENT_PORT = 20005
#         self.socket_tool = SocketCommunication()
#         self.stop_event = mp.Event()
#         self.transfer = ThreadPoolExecutor(max_workers=10)

#     def send_results(self, record):
#         try:
#             if record == None:
#                 return
#             CLIENT_IP = record['ip']
#             if len(CLIENT_IP) == 0:
#                 return
#             client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#             client.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
#             client.settimeout(0.01)
#             client.connect((CLIENT_IP, self.CLIENT_PORT))
#             self.socket_tool.send_data(client, pickle.dumps(record))
#         except Exception as e:
#             print("error occured when sending results",e)

#     def run(self):
#         try:
#             recv_socket = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
#             recv_socket.bind(self.unix_socket_path)
#             recv_socket.listen(2)
#             try:
#                 while True:
#                     if self.stop_event.is_set():
#                         self.transfer.shutdown(wait=False)
#                         recv_socket.close()
#                         break
#                     conn, address = recv_socket.accept()
#                     self.transfer.submit(self.enqueue_data, conn)
#             finally:
#                 os.remove(self.unix_socket_path)
#         except Exception as e:
#             pass

#     def enqueue_data(self,conn):
#         try:
#             info = self.socket_tool.recv_data_bytes(conn)
#             conn.close()
#             record = pickle.loads(info)
#             if record is None:
#                 return
#             self.send_results(record)
#         except Exception as e:
#             print("receive data errors", e)

#     def stop(self):
#         try:
#             self.stop_event.set()
#             self.transfer.shutdown(wait=False)
#             print("closing Sender")
#         except Exception as e:
#             print("close sender errors",e)