import React, { useState, useRef } from 'react';
import { Box } from '@mui/material';
import './Styles/App.css';
import FileInput from './Components/FileInput/FileInput';
import ControlPanel from './Components/ControlPanel/ControlPanel';
import AlertBar from './Components/AlertBar/AlertBar';

import { IStatus } from './Types/Props';
import CanvasFrame from './Components/CanvasFrame/CanvasFrame';

function App() {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<IStatus>({ status: 0 });
  const [videoSrc, setVideoSrc] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadHandler = () => {
    console.log(file);
    setLoading(true);
    // uploadFunc(uploadAddr, file).then(result => {
    //   setLoading(false);
    //   setFile(undefined);
    //   if(result) {
    //     // window.alert("上传成功");
    //     setToastStatus({status: 1});
    //   }
    //   else {
    //     // window.alert("上传失败")
    //     setToastStatus({status: 1, text:"服务器没有接收到文件"});
    //   }
    // }).catch(error => {
    //   setLoading(false);
    //   setToastStatus({status: 2, text: "服务器没有开启"});
    //   console.log(error);
    // });
    const ret = (window as any).pywebview.api.send_file(file);
    ret.then((res: any) => {setToastStatus({status: 2, text: res})})
    setLoading(false);
  }
  const openButtonClickHandler = () => {
    if (inputRef.current != null) {
      inputRef.current.click();
    }
  }
  const clearHandler = () => {
    setFile(undefined);
  }

  const openFileHandler = (file: File) => {
    setFile(file);
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    console.log(url);
  }

  return (
    <div className="App">
      <AlertBar status={toastStatus} updateStatus={setToastStatus} />
      <div className='MainBar'>
        <Box component="form">
          <FileInput action={openFileHandler} ref={inputRef} />
          <ControlPanel file={file} loading={loading} openHandler={() => openButtonClickHandler()} uploadHandler={() => uploadHandler()} clearHandler={() => clearHandler()} />
        </Box>
        <CanvasFrame videoSrc={videoSrc} uploadFrame={(data) => (window as any).pywebview.api.send_file(data)} />
      </div>
    </div >
  );
}

export default App;
