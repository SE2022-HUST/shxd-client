import cv2
import numpy as np
import os
from pathlib import Path

a = 2.086
b = 0.3269
bias = 3.14247

def fx(x):
    return a * pow(x, b) + bias

# effect type: 0 -> black out, 1 -> blurring, 2 -> pixelating
def model_rects(img, bbox_and_sigmas, effect_type=1, param=30, judgement=[], enable=False):
    new_img = img.copy()
    w = h = 0
    tt = 0
    for rect in bbox_and_sigmas:
        if judgement[tt] == False:
            tt += 1
            continue
        pixels = int(rect[2] - rect[0]) * int(rect[3] - rect[1])
        sigma = fx(pixels)
        sigma = int(sigma)
        # debug

        if enable == True:
            sigma == int(rect[4])

        #print(sigma)
        if sigma > 90 and effect_type==1 :
            effect_type=2
        rect[0], rect[1], rect[2], rect[3] = max(rect[0], 0), max(rect[1], 0), min(rect[2], img.shape[1]), min(rect[3], img.shape[0])
        x, y, w, h = int(rect[0]), int(rect[1]), int(rect[2] - rect[0]), int(rect[3] - rect[1])
        if effect_type == 0:
        # directly backout
            new_img[y:y+h, x:x+w] = 0
        elif effect_type == 1:
            # blur
            if sigma % 2 == 0:
                sigma += 1
            # print(f'ROI {x}, {y}, {w}, {h}, sigma = {sigma}')
            print('sigma:   ', sigma)
            RoI = img[y:y+h, x:x+w].astype(float)
            blur = cv2.GaussianBlur(RoI, (sigma, sigma), 0)
            new_img[y:y+h, x:x+w] = blur

        elif effect_type == 2: # pixelating
            RoI = img[y:y+h, x:x+w]
            height, width = RoI.shape[:2]
            kernel = max(2, int(width / param)), max(2, int(height / param))
            # print(kernel)
            temp = cv2.resize(RoI, kernel, interpolation=cv2.INTER_LINEAR)
            output = cv2.resize(temp, (width, height), interpolation=cv2.INTER_NEAREST)
            new_img[y:y+h, x:x+w] = output
        elif effect_type == 3:
            sigma = 81
            RoI = img[y:y+h, x:x+w]
            blur = cv2.GaussianBlur(RoI, (sigma, sigma), 0)
            new_img[y:y+h, x:x+w] = blur
        tt += 1


    return new_img
    # return new_img, w, h

def blackout_rects(img, bbox_and_sigmas):
    new_img = img.copy()
    w = h = 0
    for rect in bbox_and_sigmas:
        rect[0], rect[1], rect[2], rect[3] = max(rect[0], 0), max(rect[1], 0), min(rect[2], img.shape[1]), min(rect[3], img.shape[0])
        x, y, w, h = int(rect[0]), int(rect[1]), int(rect[2] - rect[0]), int(rect[3] - rect[1])

        # directly backout
        new_img[y:y+h, x:x+w] = 0

    return new_img

def pixel_rects(img, bbox_and_sigmas, param=30):

    new_img = img.copy()
    w = h = 0

    for rect in bbox_and_sigmas:

        rect[0], rect[1], rect[2], rect[3] = max(rect[0], 0), max(rect[1], 0), min(rect[2], img.shape[1]), min(rect[3], img.shape[0])
        x, y, w, h = int(rect[0]), int(rect[1]), int(rect[2] - rect[0]), int(rect[3] - rect[1])

        RoI = img[y:y+h, x:x+w]
        height, width = RoI.shape[:2]
        kernel = max(2, int(width / param)), max(2, int(height / param))
        # print(kernel)
        temp = cv2.resize(RoI, kernel, interpolation=cv2.INTER_LINEAR)
        output = cv2.resize(temp, (width, height), interpolation=cv2.INTER_NEAREST)
        new_img[y:y+h, x:x+w] = output

    return new_img

def blurring_rects(img, bbox_and_sigmas, effect_type=1, param=30, enable=False):
    new_img = img.copy()
    w = h = 0
    for rect in bbox_and_sigmas:
        pixels = int(rect[2] - rect[0]) * int(rect[3] - rect[1])
        sigma = fx(pixels)
        sigma = int(sigma)
        # debug

        if enable == True:
            sigma == int(rect[4])

        #print(sigma)

        rect[0], rect[1], rect[2], rect[3] = max(rect[0], 0), max(rect[1], 0), min(rect[2], img.shape[1]), min(rect[3], img.shape[0])
        x, y, w, h = int(rect[0]), int(rect[1]), int(rect[2] - rect[0]), int(rect[3] - rect[1])

        # blur
        if sigma % 2 == 0:
            sigma += 1
        # print(f'ROI {x}, {y}, {w}, {h}, sigma = {sigma}')
        # print('sigma:   ', sigma)
        RoI = img[y:y+h, x:x+w].astype(float)
        blur = cv2.GaussianBlur(RoI, (sigma, sigma), 0)
        new_img[y:y+h, x:x+w] = blur

    return new_img

# return new_img, w, h
# xyxy (top left, bottom right)
# the bigger sigmaX is, the less detail in the image.
# def blurring_rects(img, rects, sigmaX=(199,199)):
#     new_img = img.copy()
#     for rect in rects:
#         x, y, w, h = rect[0], rect[1], rect[2] - rect[0], rect[3] - rect[1]

#         # print(f'ROI {x}, {y}, {w}, {h}')

#         ROI = img[y:y+h, x:x+w]
#         blur = cv2.GaussianBlur(ROI, sigmaX, 0)
#         new_img[y:y+h, x:x+w] = blur

#     return new_img

# def blurring_with_bOrw_list(img, mlist, blacklist=True):
#     res = detect.detect(img)
#     pf = res.pandas().xyxy[0].values
#     for item in pf:
#         rect = item[0:4].astype(np.int32)
#         name = item[6]
#         # print("Debug, name is", name)
#         if not (name in mlist)^blacklist:
#             img = blurring_rects(img, [rect])

#     return img


# def auto_blur(img):
#     # img = cv2.imread('images/liuyifei4.jpg')
#     if type(img) == None:
#         print("File not exist")
#         exit()
    
#     res = detect.detect(img)
#     pf = res.pandas().xyxy[0].values
#     rects = pf[:, 0:4].astype(np.int32)
#     bret = blurring_rects(img, [rects[0]])
#     return bret
#     # cv2.imwrite('output.jpg', bret)


def test_blur_rect():
    input_dir = 'images/'
    img_name = 'person.jpg'
    # img_name = 'liuyifei4.jpg'

    img = cv2.imread(input_dir + img_name)

    res = detect.detect_for_Xstream(img)
    if not os.path.exists('output/test_blur_rect/'):
        os.makedirs('output/test_blur_rect/')

    for kernel in range(1, 10):
        # print("kernel", kernel)
        blurred_img = model_rects(img, res.get_objects(), effect_type=2, game=True, param=kernel)
        cv2.imwrite(f'output/test_blur_rect/blurred_img_{kernel}.jpg', blurred_img)


if __name__ == '__main__':
    test_blur_rect()
