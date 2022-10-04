import React, {useState, useRef} from 'react';
import { Box } from '@mui/material';
import './App.css';
import FileInput from './Components/FileInput/FileInput';
import ControlPanel from './Components/ControlPanel/ControlPanel';
import uploadFunc from './Apis/Upload';
import { uploadAddr } from './Apis/Constants';
import AlertBar from './Components/AlertBar/AlertBar';

import { IStatus } from './Types/Props';

function App() {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<IStatus>({status: 0});
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadHandler = () => {
    console.log(file);
    setLoading(true);
    uploadFunc(uploadAddr, file).then(result => {
      setLoading(false);
      setFile(undefined);
      if(result) {
        // window.alert("上传成功");
        setToastStatus({status: 1});
      }
      else {
        // window.alert("上传失败")
        setToastStatus({status: 1, text:"服务器没有接收到文件"});
      }
    }).catch(error => {
      setLoading(false);
      setToastStatus({status: 2, text: "服务器没有开启"});
      console.log(error);
    });
  }
  const openHandler = () => {
    if(inputRef.current != null) {
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
          <ControlPanel file={file} loading={loading} openHandler={()=>openHandler()} uploadHandler={()=>uploadHandler()} clearHandler={()=>clearHandler()} />
        </Box>
      </div>
      <button onClick={() => {
        const w = window.open('_black') //这里是打开新窗口
        let url = 'http://www.baidu.com'
        w!.location.href = url //这样就可以跳转了
      }}>
        测试跳转
      </button>

    </div>
  );
}

export default App;
