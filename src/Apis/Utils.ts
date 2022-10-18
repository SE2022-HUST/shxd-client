import { FrameData } from './Types';

export async function uploadFunc(url: string, file: File | undefined) {
    if (file === undefined) {
        return false;
    }
    const data = new FormData();
    data.append('file', file);
    const response = await fetch(url, {
        method: 'POST',
        body: data
    })
    console.log(response);
    if (response.ok && response.status == 200) {
        return true;
    }
    else {
        return false;
    }
}

interface IProps {
    data: FrameData
}


export function dataAlter(props: IProps) {
    var l = props.data.data.length;
    for (var i = 0; i < l; i += 4) {
        var R = props.data.data[i + 0]
        var G = props.data.data[i + 1]
        var B = props.data.data[i + 2]
        var A = props.data.data[i + 3]
    }
    var list1 = new Array(), list2 = new Array(), list3 = new Array(), list = new Array()
    /*list[0] = props.data.height
    list[1] = props.data.width*///??
    var k = 0
    for (var i = 0; i < props.data.width; i++) {
        list1[i] = []
        for (var j = 0; j < props.data.height; j++) {
            list1[i][j] = R[k]
            k++;
        }
    }
    k = 0
    for (var i = 0; i < props.data.width; i++) {
        list2[i] = []
        for (var j = 0; j < props.data.height; j++) {
            list2[i][j] = G[k]
            k++;
        }
    }
    k = 0
    for (var i = 0; i < props.data.width; i++) {
        list3[i] = []
        for (var j = 0; j < props.data.height; j++) {
            list3[i][j] = B[k]
            k++;
        }
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < props.data.width; j++) {
            for (var k = 0; k < props.data.height; k++) {
                if (i == 0)
                    list[j][k] = list1[j][k]
                else if (i == 1)
                    list[j][k] = list2[j][k]
                else
                    list[j][k] = list3[j][k]
            }
        }
    }
}