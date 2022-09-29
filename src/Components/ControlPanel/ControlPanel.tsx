import React, {useState, useRef} from 'react';
import DisplayBox from '../DisplayBox/DisplayBox';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { Delete } from '@mui/icons-material';
import './ControlPanel.css'
import { Tooltip } from '@mui/material';

interface IProps {
    file: File | undefined;
    loading?: boolean;
    openHandler: () => void;
    uploadHandler: () => void;
    clearHandler: () => void;
}

function ControlPanel(props: IProps) {
    const loadingStatus = props.loading === undefined ? false : props.loading;
    const file = props.file;
    const openHandler = props.openHandler;
    const uploadHandler = props.uploadHandler;
    const clearHandler = props.clearHandler;
    return (
        <div className='ManuButtons'>
            <DisplayBox file={file} />
            <span className='Button'>
                <Button variant='contained' onClick={openHandler}>打开</Button>
            </span>
            <Tooltip title="请在上传前先打开一个文件">
                <span className='Button'>
                    <LoadingButton className='Button' variant='contained' onClick={uploadHandler} disabled={file === undefined} loading={loadingStatus}>上传</LoadingButton>
                </span>
            </Tooltip>
            <span className='DelButton'>
                <IconButton aria-label='delete' color='primary' onClick={clearHandler}>
                    <Delete/>
                </IconButton>
            </span>
        </div>
    )
}

export default ControlPanel;