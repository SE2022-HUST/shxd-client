<<<<<<< HEAD
=======
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

>>>>>>> ad084c7b6d26b059150f44813dfad00a9d5fdb49
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
<<<<<<< HEAD
        rowGreen.push(data.data[i + 1]);
        rowBlue.push(data.data[i + 2]);
        if (rowRed.length >= data.width) {
=======
        rowGreen.push(data.data[i+1]);
        rowBlue.push(data.data[i+2]);
        if(rowRed.length >= data.width) {
>>>>>>> ad084c7b6d26b059150f44813dfad00a9d5fdb49
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