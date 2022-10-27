import config
import time
from load_balancer import LoadBalancer
from video_process import Video_Processing
import multiprocessing as mp

for i in range(config.num_per_gpu):
    #setup load balancer
    lb = LoadBalancer(20005, 10000)
    ins_list = []
    for device in config.cuda_devices:
        #initialize end & load balancer start signal
        init_end_event = mp.Value("i", 0)
        load_balancer_signal = mp.Value("i", 0)
        ins = Video_Processing(device, lb.get_queue(), init_end_event, load_balancer_signal)
        ins_list.append((ins, init_end_event))
        lb.register_instance(load_balancer_signal)
    lb.start()
    #setup instances
    for temp in ins_list:
        ins, init_end_event = temp[0], temp[1]
        try:
            ins.start()
            while True:
                print("==========setting waiting please==========", init_end_event.value)
                if init_end_event.value == 1:
                    break
                else:
                    time.sleep(5)
        except Exception as e:
            print("start instance fails",e)