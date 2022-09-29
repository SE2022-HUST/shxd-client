import React, {useState, useRef} from 'react';
import './FileInput.css'

interface IFIProps {
    action: (file: File) => void;
}

// 此处使用了RefForward进行Ref的传递 直接通过Props传递会遇到生命周期问题
// 同理不能直接传递stateChange函数，需要传递stateChange的回调函数

const FileInput = React.forwardRef<HTMLInputElement, IFIProps>((props: IFIProps, ref) => {
    let setFile = props.action;
    return (
        <div className='FileInput'>
            <input hidden id='file' type='file' name='file' ref={ref} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        console.log(e.target.files);
                        if(e.target != null) {
                            setFile(e.target.files![0]);
                            // console.log(e.target.files![0]);
                            // console.log(file);
                            // if(displayRef.current != null)
                            // displayRef.current.innerText = e.target.files![0].name;
                        }
            }} />
        </div>
    )
})

export default FileInput;