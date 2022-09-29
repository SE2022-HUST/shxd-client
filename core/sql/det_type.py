# [xmin, ymin, xmax, ymax, class]
from decimal import Decimal
X = 0.3
def detype(prot_list, exp_list):

    # protect includes expose: protect all, no expose
    if prot_list[0]<exp_list[0] and prot_list[1]<exp_list[1] and prot_list[2]>exp_list[2] and prot_list[3]>exp_list[3]:
        for index in range(0, 4):
            exp_list[index] = 0
        return [prot_list,exp_list]

    # expose includes protect: protect and expose
    elif prot_list[0]>exp_list[0] and prot_list[1]>exp_list[1] and prot_list[2]<exp_list[2] and prot_list[3]<exp_list[3]:
        return [prot_list,exp_list]

    # overlap
    elif prot_list[3]>exp_list[1] and prot_list[1]<exp_list[3] and prot_list[2]>exp_list[0] and prot_list[0]<exp_list[2]:
        x_min = max(prot_list[0], exp_list[0])
        y_min = max(prot_list[1], exp_list[1])
        x_max = min(prot_list[2], exp_list[2])
        y_max = min(prot_list[3], exp_list[3])
        square_overlap = Decimal((x_max - x_min)*(y_max - y_min))
        square_protect_bbox = Decimal((prot_list[2]-prot_list[0])*(prot_list[3]-prot_list[1]))
        overate = square_overlap/square_protect_bbox
        if overate < X:
            return prot_list,exp_list
        else:
            for index in range(0, 4):
                exp_list[index] = 0
            return prot_list,exp_list