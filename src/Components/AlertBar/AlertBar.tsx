import React, {useState, useRef} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import internal from 'stream';
import { text } from 'stream/consumers';

import {IStatus} from '../../Types/Props'

// 状态：0-正常 无提示 1-上传成功 2-上传失败 
interface IProps {
    status: IStatus;
    updateStatus: (status: IStatus) => void;
}

function AlertBar(props: IProps) {
    const status = props.status.status;
    const alertText = props.status.text;
    const updateStatus = props.updateStatus;
    let infoText: string = "";
    if(status == 1) {
        infoText = alertText === undefined ? "上传成功" : "上传成功："+ alertText;
    }
    else if(status == 2) {
        infoText = alertText === undefined ? "上传失败" : "上传失败："+ alertText;
    }
    const open = status == 0 ? false : true;
    return (
        <Snackbar
            anchorOrigin={{vertical:'top', horizontal:'center' }}
            open={open}
            onClose={()=>updateStatus({status: 0})}
            autoHideDuration={3000}>
            <Alert severity={status == 1 ? 'success' : 'error'}>
                {infoText}
            </Alert>
        </Snackbar>
    )

}

export default AlertBar;