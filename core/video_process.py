import torch
import cv2
import numpy as np
import os
import time
from facenet_pytorch import MTCNN
import pickle
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from sampler import VideoSampler, frame_to_video
from privacy_preserving import Protector
import os
import socket
from socks import SocketCommunication
import multiprocessing as mp


def videoProcessing_byframe(frame, protect_item, expose_item):
    pro = Protector()
    pro.protect_conditions = [protect_item]
    pro.expose_conditions = [expose_item]
    pro_frame = pro.process_frame(frame)
    return pro_frame

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

class Video_Processing(mp.Process):

    def __init__(self, cuda_index, shared_queue, init_end_event, load_balancer_signal):
        super().__init__()
        self.pro = Protector()
        self.sender_socket_path = "./tmp/send_result/" + str(cuda_index)
        self.input_queue = shared_queue
        self.cuda_index = cuda_index
        self.sock_tools = SocketCommunication()
        self.stop_event = mp.Event()
        self.pro = Protector()
        self.init_end_event = init_end_event
        self.load_balancer_signal = load_balancer_signal
        self.transfer = ThreadPoolExecutor(max_workers=10)

    def get_req_from_loadbalancer(self):
        """
        get requests from the load balance
        Returns:
        """
        result = None
        request_info = []
        expose_items = []
        protect_items = []
        while True:
            try:
                temp = self.input_queue.get(block=False)
            except Exception as e:
                break
            if temp is None:
                continue
            result = np.load(temp['data'])
            protect_items = temp['protect_item']
            expose_items = temp['expose_item']
            request_info = temp
            break
        return result, request_info, protect_items, expose_items

    #send data to sender process
    def socket_to_sender(self, record):
        try:
            client = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
            client.connect(self.sender_socket_path)
            upload_pickle = pickle.dumps(record)
            self.sock_tools.send_data_bytes(client, upload_pickle)
        except Exception as e:
            print("socket send errors",e)

    def initialize_model(self, type_model):
        model = None
        try:
            torch.cuda.set_device(torch.device('cuda:' + str(self.cuda_index)))
            if type_model == 'total':
                model = torch.hub.load(('./yolov5'), 'custom', path='./weights/yolov5s.pt', source='local')
                model.to(torch.device('cuda:' + str(self.cuda_index)))
            elif type_model == 'liscence':
                model = torch.hub.load(('./yolov5'), 'custom', path='./weights/license_best.pt', source='local')
                model.to(torch.device('cuda:' + str(self.cuda_index)))
            else:
                model = MTCNN(keep_all=True, device=torch.device('cuda:' + str(self.cuda_index)))
        except Exception as e:
            print("error happens when creating the object of DNNs", e)
        print("create model instance")
        return model

    def warm_up_model(self, model, is_last):
        warm_up_counts = 0
        warm_up = True
        input_data = torch.rand(1, 3, 320, 320)
        while warm_up:
            try:
                start = time.time()
                result = model(input_data)
                end = time.time()
                delay = end - start
                if abs(round(delay) - 100) <= 3 or warm_up_counts > 30:
                    if is_last:
                        self.init_end_event.value = 1
                        self.load_balancer_signal.value = 1
                    warm_up = False
                    break
                warm_up_counts = warm_up_counts + 1
            except Exception as e:
                print("-----warm up the instance fails------", e)
        return warm_up

    def run(self):
        #initialize models
        total_model = self.initialize_model('total')
        liscence_model = self.initialize_model('liscence')
        mtcnn = self.initialize_model('mtcnn')
        if total_model is None or liscence_model is None:
            return
        warm_up = True
        #warm up models
        while True:
            if self.stop_event.is_set():
                break
            if warm_up:
                warm_up = self.warm_up_model(total_model, 0)
                warm_up = self.warm_up_model(liscence_model, 1)
                #warm_up = self.warm_up_model(mtcnn, 1)

            #get request
            input_batch, batch_info, protect_item, expose_item = self.get_req_from_loadbalancer()
            if input_batch is None:
                continue
            try:
                #process image
                self.pro.protect_conditions = [protect_item]
                self.pro.expose_conditions = [expose_item]
                pro_frame = self.pro.process_frame(total_model, liscence_model, mtcnn, input_batch)
            except Exception as e:
                print("==== process data errors===", e, self.start_layer, self.end_layer)
                continue

            result = pro_frame.clone()
            data = result.cpu()
            batch_info['output'] = data
            #prepare to send back to clients
            try:
                self.transfer.submit(self.socket_to_sender, batch_info)
            except Exception as e:
                print("send data to sender errors", e)

    def stop(self):
        print("closing instance", self.ins_index)
        self.transfer.shutdown()
        self.stop_event.set()


class ResultSender(mp.Process):
    def __init__(self, unix_socket_path):
        super().__init__()
        self.unix_socket_path = unix_socket_path
        self.socket_tool = SocketCommunication()
        self.stop_event = mp.Event()
        self.transfer = ThreadPoolExecutor(max_workers=10)

    def send_results(self, record):
        #send results to client
        try:
            if record == None:
                return
            CLIENT_IP = record['ip']
            CLIENT_PORT = record['port']
            if len(CLIENT_IP) == 0:
                return
            client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            client.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
            client.settimeout(0.01)
            client.connect((CLIENT_IP, CLIENT_PORT))
            self.socket_tool.send_data(client, pickle.dumps(record))
        except Exception as e:
            print("error occured when sending results",e)

    def run(self):
        try:
            recv_socket = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
            recv_socket.bind(self.unix_socket_path)
            recv_socket.listen(2)
            try:
                while True:
                    if self.stop_event.is_set():
                        self.transfer.shutdown(wait=False)
                        recv_socket.close()
                        break
                    conn, address = recv_socket.accept()
                    self.transfer.submit(self.enqueue_data, conn)
            finally:
                os.remove(self.unix_socket_path)
        except Exception as e:
            pass

    def enqueue_data(self,conn):
        try:
            info = self.socket_tool.recv_data_bytes(conn)
            conn.close()
            record = pickle.loads(info)
            if record is None:
                return
            self.send_results(record)
        except Exception as e:
            print("receive data errors", e)

    def stop(self):
        try:
            self.stop_event.set()
            self.transfer.shutdown(wait=False)
            print("closing Sender")
        except Exception as e:
            print("close sender errors",e)