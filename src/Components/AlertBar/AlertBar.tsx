import React, {useState, useRef} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import internal from 'stream';
import { text } from 'stream/consumers';

// 状态：0-正常 无提示 1-上传成功 2-上传失败 
interface IProps {
    status: number;
    statusInfo?: string;
    alertText?: string;
    updateStatus: (status: number) => void;
}

function AlertBar(props: IProps) {
    const status = props.status;
    const updateStatus = props.updateStatus;
    let infoText: string = "";
    if(props.alertText !== undefined) {
        infoText = props.alertText
    }
    else if(status == 1) {
        infoText = "上传成功";
    }
    else if(status == 2) {
        infoText = "上传失败";
    }
    const open = status == 0 ? false : true;
    return (
        <Snackbar
            anchorOrigin={{vertical:'top', horizontal:'center' }}
            open={open}
            onClose={()=>updateStatus(0)}
            autoHideDuration={3000}>
            <Alert severity={status == 1 ? 'success' : 'error'}>
                {infoText}
            </Alert>
        </Snackbar>
    )

}

export default AlertBar;