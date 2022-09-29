import React, {useState, useRef} from 'react';
import Input from '@mui/material/Input';
import './DisplayBox.css'

interface IProps {
    file: File | undefined;
}

function DisplayBox(props: IProps) {
    const file = props.file;
    return (
        <span className="FileDisplay">
            <Input placeholder='Please choose a file~' readOnly value={file === undefined ? 'No File' : file.name} />
        </span>
    )
}

export default DisplayBox;