import re
from sql.list_item import listitem
from sql.type_def import OBJECT, PEOPLE, MOTION_INFO, COLOR

"""def classify(name):
    name_list = []
    name_list.append(name)
    if len(list(set(OBJECT).intersection(name_list))) != 0:
        return 'OBJECT'
    elif len(list(set(PEOPLE).intersection(name_list))) != 0:
        return 'PEOPLE'
    elif len(list(set(MOTION_INFO).intersection(name_list))) != 0:
        return 'MOTION_INFO'
    elif len(list(set(COLOR).intersection(name_list))) != 0:
        return 'COLOR'
    else:
        return 'none'
"""

def where_solve(where_list_string):
    time = re.search(r"\[(.+?)\]", where_list_string).group()
    where_dict = {'timestamp':time}
    return where_dict

def protect_solve(protect_string):
    protect_list = []
    spl_pro = protect_string.split(',')
    for item in spl_pro:
        spl_pro_sec = item.strip().split('and')
        ITEM = []
        for elem in spl_pro_sec:
            elem = elem.strip()
            name = (re.search(r"'(.+?)'", elem).group())[1:-1].strip()
            type = re.search(r"^(.+?)=", elem).group()[:-1].strip()
            ELEM = listitem(name, type)
            ITEM.append(ELEM)
        protect_list.append(ITEM)
    return protect_list

def expose_solve(expose_string):
    expose_list = []
    spl_exp = expose_string.split(',')
    for item in spl_exp:
        spl_exp_sec = item.strip().split('and')
        ITEM = []
        for elem in spl_exp_sec:
            elem = elem.strip()
            name = (re.search(r"'(.+?)'", elem).group())[1:-1].strip()
            type = re.search(r"^(.+?)=", elem).group()[:-1].strip()
            ELEM = listitem(name, type)
            ITEM.append(ELEM)
        expose_list.append(ITEM)
    return expose_list