from constant import *
import numpy as np
import cv2
import collections


def classno2name(id):
    id = int(id)
    if id < len(COCO_CLASS_NAME):
        return COCO_CLASS_NAME[id]
    else:
        print("class ID is out of scope.")

def name2classno(name):
    try:
        return COCO_CLASS_NAME.index(name)
    except:
        return -1


# for simple implementation, we use linear map
TO_SIGMA_BIAS = 31
TO_SIGMA_K = 300
TO_SIGMA_MAX = 199
def scenesize2sigma(values, sigma=0):
    if sigma != 0:
        # contant blur sigma
        t_values = values.copy()
        t_values[:] = sigma / 3
        return t_values.reshape((t_values.shape[0], 1)).astype(np.int32)
    
    # dynamic blur sigma
    t_values = np.clip(values / ZOOM_SCALE * TO_SIGMA_K + TO_SIGMA_BIAS, 0, TO_SIGMA_MAX).astype(np.int32)
    return t_values.reshape((t_values.shape[0], 1))


# the input pixel is HSV form.
# output the color_idx of HSV_COLORS
def pixel_color(pixel):
    for idx, e in enumerate(HSV_COLOR_RANGE):
        lower, upper = e
        valid = True
        for i in range(3):
            if not (lower[i] <= pixel[i] <= upper[i]):
                valid = False
                break
        if valid:
            return idx
    
    return -1 # We didn't consider this color yet.

# we consider an object is green, if the pixel percent of green is over some threshold
COLOR_THRESHOLD = 0.1
def img_is_color(img, color):
    h, w = img.shape[0], img.shape[1]
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    cnt = collections.defaultdict(int)
    for i in range(0, h):
        for j in range(0, w):
            c = pixel_color(hsv[i, j])
            cnt[HSV_COLORS[c]] +=1 
            if color == HSV_COLORS[c] and cnt[color] / (h * w) >= COLOR_THRESHOLD:
                return True
    
    return False



# Img color
# When a color is the mojar part in the image, we consider the image's color as that color. 
def img_color(img):
    h, w = img.shape[0], img.shape[1]
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    cnt = collections.defaultdict(int)
    for i in range(h):
        for j in range(w):
            cnt[HSV_COLORS[pixel_color(hsv[i, j])]] += 1
    
    max_cnt, color = 0, 0
    # print(cnt)
    for c, num in cnt.items():
        if num > max_cnt:
            max_cnt = num
            color = c
    # print("Debug at img_color::", "img color is", HSV_COLORS[color])
    return color


# [xmin, ymin, xmax, ymax, class]
from decimal import Decimal
X = 0.5
def IOU_relation(prot_list, exp_list):
    # protect includes expose: protect all, no expose
    if prot_list[0]<exp_list[0] and prot_list[1]<exp_list[1] and prot_list[2]>exp_list[2] and prot_list[3]>exp_list[3]:
        for index in range(0, 4):
            exp_list[index] = 0
        return prot_list, exp_list

    # expose includes protect: protect and expose
    elif prot_list[0]>exp_list[0] and prot_list[1]>exp_list[1] and prot_list[2]<exp_list[2] and prot_list[3]<exp_list[3]:
        return prot_list, exp_list

    # overlap
    elif prot_list[3]>exp_list[1] and prot_list[1]<exp_list[3] and prot_list[2]>exp_list[0] and prot_list[0]<exp_list[2]:
        x_min = max(prot_list[0], exp_list[0])
        y_min = max(prot_list[1], exp_list[1])
        x_max = min(prot_list[2], exp_list[2])
        y_max = min(prot_list[3], exp_list[3])
        square_overlap = (x_max - x_min)*(y_max - y_min)
        square_protect_bbox = (prot_list[2]-prot_list[0])*(prot_list[3]-prot_list[1])
        overate = square_overlap/square_protect_bbox
        if overate < X:
            return prot_list,exp_list
        else:
            for index in range(0, 4):
                exp_list[index] = 0
            return prot_list, exp_list


def modify_bbox_with_IOU(protect_bbox, expose_bbox):
    for i in range(len(protect_bbox)):
        for j in range(len(expose_bbox)):
            # print("Before modify:", protect_bbox[i], expose_bbox[j])
            IOU_relation(protect_bbox[i], expose_bbox[j])
            # print("After modify:", protect_bbox[i], expose_bbox[j])


def expose_IOU(src, expose_bbox, addon_img=None):
    img = src.copy() if type(addon_img) == None else addon_img.copy()
    for rect in expose_bbox:
        x, y, w, h = int(rect[0]), int(rect[1]), int(rect[2] - rect[0]), int(rect[3] - rect[1])
        if w == 0 or h == 0:
            continue
        img[y:y+h, x:x+w] = src[y:y+h, x:x+w]
    return img

def square(c1):
    return (c1[2] - c1[0]) * (c1[3] - c1[1])


def get_IoU(c1, c2):
    x1, y1, x2, y2 = max(c1[0], c2[0]), max(c1[1], c2[1]), min(c1[2], c2[2]), min(c1[3], c2[3])

    if x1 >= x2 or y1 >= y2:
        return 0.
    else:
        u = (x2 - x1) * (y2 - y1)
        return u / (square(c1) + square(c2) - u)

# get distance of two bboxes' center point
def get_distance(c1, c2):
    x1, y1, x2, y2 = (c1[0]+c1[2]) / 2, (c1[1]+c1[3]) / 2, (c2[0]+c2[2]) / 2, (c2[1]+c2[3]) / 2
    from math import sqrt, pow
    return sqrt(pow((x2 - x1), 2) + pow((y2 - y1), 2))


########## test code #################
def test_img_color():
    import core.detect as detect
    input = 'output/'
    image_name = 'frame_skip10_1.png'
    img = cv2.imread(input + image_name)
    res = detect.detect_for_fxevs(img)

    objs = res.get_objects()

    for i, obj in enumerate(objs):
        x, y, w, h = obj[0], obj[1], obj[2] - obj[0], obj[3] - obj[1]
        print("Object is", COCO_CLASS_NAME[int(obj[4])])
        print(x, y, w, h)
        roi = img[y:y+h, x:x+w]
        color =  img_color(roi)
        print("Object color is", color)
        cv2.imwrite('output/' + COCO_CLASS_NAME[int(obj[4])] + "_" + color + "_" + str(i) + '.png', roi)
        print()

def test_img_is_color():
    import core.detect as detect
    input = 'images/'
    image_name = '000000000632.jpg'
    img = cv2.imread(input + image_name)
    res = detect.detect_for_fxevs(img)

    objs = res.get_objects()
    colors = ['red', 'blue', 'green', 'black', 'white']
    color_objs = collections.defaultdict(list)
    for i, obj in enumerate(objs):
        x, y, w, h = obj[0], obj[1], obj[2] - obj[0], obj[3] - obj[1]
        print("Object is", COCO_CLASS_NAME[int(obj[4])])
        print(x, y, w, h)
        roi = img[y:y+h, x:x+w]
        for c in colors:
            if img_is_color(roi, c):
                color_objs[c].append(roi)
    
    # save to file
    for c, objs in color_objs.items():
        for i, obj in enumerate(objs):
            cv2.imwrite('output/' + c + str(i) + '.png', obj)


def test_sigma():
    arr = np.zeros(5)
    t = scenesize2sigma(arr)
    print(t)

if __name__ == '__main__':
    # test_img_is_color()
    test_sigma()