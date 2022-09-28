import re
from sql.sol_func import where_solve, protect_solve, expose_solve

def parse_sql(input_string):
    flag_expose=0
    flag_intensity=0
    key_list = ['SELECT', 'FROM', 'WHERE', 'PROTECT']
    value_list = []

    # select from where
    select_list = re.findall(r"select(.+?)from", input_string, re.IGNORECASE)
    select_list[0] = select_list[0].strip()
    from_list = re.findall(r"from(.+?)where", input_string, re.IGNORECASE)
    from_list[0] = from_list[0].strip()
    string_division = (re.search(r"where(.+?)protect", input_string, re.IGNORECASE).group())[5:-7].strip()
    where_dict = where_solve(string_division)

    # End with PROTECT INTENSITY
    if input_string.find("PROTECT INTENSITY")>0 or input_string.find("protect intensity")>0:
        intensity_list = re.findall(r"protect intensity(.+?)$", input_string, re.IGNORECASE)
        intensity_list[0] = intensity_list[0].strip()
        key_list.append('PROTECT INTENSITY')
        flag_intensity = 1

        # EXPOSE AND PROTECT INTENSITY
        if input_string.find("EXPOSE")>0 or input_string.find("expose")>0:
            key_list.insert(4, 'EXPOSE')
            string_division = (re.search(r"expose(.+?)protect intensity", input_string, re.IGNORECASE).group())[6:-17].strip()
            expose_list = expose_solve(string_division)
            string_division = (re.search(r"protect(.+?)expose", input_string, re.IGNORECASE).group())[7:-6].strip()
            protect_list = protect_solve(string_division)
            flag_expose = 1

        # Only PROTECT INTENSITY
        else:
            string_division = (re.search(r"protect(.+?)protect intensity", input_string, re.IGNORECASE).group())[7:-17].strip()
            protect_list = protect_solve(string_division)

    # End with EXPOSE or PROTECT
    else:
        # EXPOSE
        if input_string.find("EXPOSE")>0 or input_string.find("expose")>0:
            flag_expose = 1
            key_list.append('EXPOSE')
            string_division = (re.search(r"expose(.+?)$", input_string, re.IGNORECASE).group())[6:].strip()
            expose_list = expose_solve(string_division)
            string_division = (re.search(r"protect(.+?)expose", input_string, re.IGNORECASE).group())[7:-6].strip()
            protect_list = protect_solve(string_division)
        # PROTECT
        else:
            string_division = (re.search(r"protect(.+?)$", input_string, re.IGNORECASE).group())[7:].strip()
            protect_list = protect_solve(string_division)

    # Last packing
    value_list = select_list + from_list
    value_list.append(where_dict)
    value_list.append(protect_list)
    if flag_expose == 1:
        value_list.append(expose_list)
    if flag_intensity == 1:
        value_list = value_list + intensity_list

    output = dict(zip(key_list, value_list))
    return output

############TEST############
"""STR = "SELECT * FROM crossroad.mp4 WHERE timestamp= [10,20] PROTECT object='license plate' EXPOSE object ='car' and color = 'red'"
OUT = parse_sql(STR)
print(OUT)"""