
COCO_CLASS_NAME = [ 'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light',
         'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
         'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee',
         'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard',
         'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple',
         'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch',
         'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone',
         'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear',
         'hair drier', 'toothbrush', 'license', 'face', 'person face']


COCO_PERSON_RELATED = ['person', 'face', 'person face']
COCO_OBJECTS = set(COCO_CLASS_NAME).difference(COCO_PERSON_RELATED)

RES_CLASS_IDX = 4
RES_PERCENT_IDX = 5
ZOOM_SCALE = 10000

HSV_COLORS = ['black', 'gray', 'white', 'red', 'red', 'orange', 'green', 'cyan', 'blue', 'purle']
# [(lower, upper), ...]
HSV_COLOR_RANGE = [([0, 0, 0], [180, 255, 46]), ([0, 0, 46], [180, 43, 220]), ([0, 0, 221], [180, 30, 255]), \
        ([0, 42, 46], [10, 255, 255]), ([156, 42, 46], [180, 255, 255]), ([11, 43, 46], [34, 255, 255]), ([45, 43, 46], [77, 255, 255]), ([78, 43, 46], [99, 255, 255]), \
            ([100, 43, 46], [124, 255, 255]), ([125, 43, 46], [155, 255, 255])]

# if the color ratio is more than COLOR_THRESHOLD, we consider the object is the color. 
# COLOR_THRESHOLD = 0.25

    