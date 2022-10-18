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

export function dataAlter(data: ImageData) {
    let l = data.data.length;
    let R = new Array<Array<number>>();
    let G = new Array<Array<number>>();
    let B = new Array<Array<number>>();
    let rowRed = new Array<number>();
    let rowGreen = new Array<number>();
    let rowBlue = new Array<number>();
    for (let i = 0; i < l; i += 4) {
        rowRed.push(data.data[i]);
        rowGreen.push(data.data[i+1]);
        rowBlue.push(data.data[i+2]);
        if(rowRed.length >= data.width) {
            R.push(rowRed);
            rowRed = new Array<number>();
            G.push(rowGreen);
            rowGreen = new Array<number>();
            B.push(rowBlue);
            rowBlue = new Array<number>();
        }
    }
    return [R, G, B];
}