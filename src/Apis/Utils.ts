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

export function matrixEncode(data: ImageData) {
    let l = data.data.length;
    let pixel = new Array<number>(3);
    let row = new Array<Array<number>>();
    let mat = new Array<Array<Array<number>>>()
    for (let i = 0; i < l; i += 4) {
        pixel[0] = data.data[i+2]; //red
        pixel[1] = data.data[i+1]; //green
        pixel[2] = data.data[i]; //blue
        row.push(pixel);
        pixel = new Array<number>(3);
        if(row.length >= data.width) {
            mat.push(row);
            row = new Array<Array<number>>();
        }
    }

    return mat;
}

export function matrixDecode(mat: Array<Array<Array<number>>>) {
    let data = new Array<number>();
    for(let row of mat) {
        for(let pixel of row) {
            data.push(pixel[2]);
            data.push(pixel[1]);
            data.push(pixel[0]);
            data.push(255);
        }
    }
    return new Uint8ClampedArray(data);
}