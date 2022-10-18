import React, { useState, useRef } from 'react';
import { Box } from '@mui/material';
import './Styles/App.css';
import FileInput from './Components/FileInput/FileInput';
import ControlPanel from './Components/ControlPanel/ControlPanel';
import uploadFunc from './Apis/Upload';
import { uploadAddr } from './Apis/Constants';
import AlertBar from './Components/AlertBar/AlertBar';

import { IStatus } from './Types/Props';

import CanvasFrame from './Components/CanvasFrame'

function App() {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<IStatus>({ status: 0 });
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
    setToastStatus({status: 2, text: ret});
    setLoading(false);
  }
  const openHandler = () => {
    if (inputRef.current != null) {
      inputRef.current.click();
    }
  }
  const clearHandler = () => {
    setFile(undefined);
  }

  return (
    <div className="App">
      <AlertBar status={toastStatus} updateStatus={setToastStatus} />
      <div className='MainBar'>
        <Box component="form">
          <FileInput action={(file: File) => setFile(file)} ref={inputRef} />
          <ControlPanel file={file} loading={loading} openHandler={() => openHandler()} uploadHandler={() => uploadHandler()} clearHandler={() => clearHandler()} />
          <CanvasFrame text="id"></CanvasFrame>
        </Box>
      </div>
    </div >
  );
}

export default App;
