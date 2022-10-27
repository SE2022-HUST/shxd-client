import time
import os
import socket
from socks import SocketCommunication
import pickle
from concurrent.futures import ThreadPoolExecutor
import multiprocessing as mp
import blosc
import numpy as np
import config

class LoadBalancer(mp.Process):
    def __init__(self, server_port, maxsize, SERVER_IP = '192.168.1.36'):
        super().__init__()
        self.server_port = server_port
        self.server_ip = SERVER_IP
        self.queue = mp.Manager().Queue(round(maxsize))
        self.socket_tool = SocketCommunication()
        self.register_ins = []
        self.stop_event = mp.Event()
        self.transfer = ThreadPoolExecutor(max_workers=10)

    #register corresponding instances
    def register_instance(self, instance_signal):
        self.register_ins.append(instance_signal)
        return

    def get_queue(self):
        return self.queue

    def enqueue_data(self,conn):
        try:
            request = self.socket_tool.recv_data_bytes(conn)
            conn.close()
            #deserialize
            request = pickle.loads(blosc.decompress(request))
            #data format
            content = {'data': np.array(request['data']), 'protect_item': request['protect_item'], \
                'expose_item': request['expose_item'], 'ip': request['ip'], 'port': request['port']}
            try:
                #put into queue
                self.queue.put(content, block=False)
            except Exception as e:
                print("put input data errors", e,content)
                pass
        except Exception as e:
            print("enqueue data errors",e)
        
    def run(self):
        recv_socket = None
        # wait until all instances are initialized
        while True:
            ins_num = len(self.register_ins)
            if ins_num == len(config.cuda_devices * config.num_per_gpu):
                print(ins_num)
                break
        while True:
            sum = 0
            for i in range(ins_num):
                sum = sum + self.register_ins[i].value
            if sum == ins_num:
                print("model initialization finishes",sum)
                break
            else:
                print("model initializition has not finished")
                time.sleep(2)
        #get requests from clients
        while True:
            try:
                recv_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                recv_socket.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
                recv_socket.bind((self.server_ip, self.server_port))
                recv_socket.listen()
                break
            except Exception as e:
                print("bind port fails ", e, self.server_port)
                os.system('fuser -k -n tcp ' + str(self.server_port))
                time.sleep(3)
        flag = True
        while True:
            try:
                if self.stop_event.is_set():
                    self.transfer.shutdown(wait=False)
                    recv_socket.close()
                    print("===========close the load balancer=====================",)
                    break
                if flag:
                    self.queue.put(None)
                    flag = False
                conn, client_addr = recv_socket.accept()
                #put requests into queue
                self.transfer.submit(self.enqueue_data, conn)
            except Exception as e:
                print("===LoadBlancer===error happens while receving data", e, (self.server_ip, self.server_port))
    
    def stop(self):
        self.stop_event.set()
        print("closing LoadBlancer ")