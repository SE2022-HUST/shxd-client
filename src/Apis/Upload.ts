async function uploadFunc(url: string, file: File | undefined) {
    if(file === undefined) {
        return false;
    }
    const data = new FormData();
    data.append('file', file);
    const response = await fetch(url, {
        method: 'POST',
        body: data
    })
    console.log(response);
    if(response.ok && response.status == 200) {
        return true;
    }
    else{
        return false;
    }
}

export default uploadFunc;