import Box from '@mui/material/Box/Box';
import React, { useState, useRef, useEffect } from 'react';
import { FrameData } from '../../Apis/Types';
import VideoPlyaer from './VideoPlayer';

interface IProps {
    videoSrc: string | undefined,
    uploadFrame: (data: any) => Promise<any>,
}

function CanvasFrame(props: IProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null); // 注意ref必须赋初值null 否则报错
    const videoRef = useRef<HTMLVideoElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
    useEffect(() => {
        if (canvasRef.current !== null) {
            setContext(canvasRef.current.getContext('2d'));
        }
    })

    const captureFrame = () => {
        if (videoRef.current !== null) {
            if (videoRef.current.paused || videoRef.current.ended) {
                return;
            }
            if (context !== null && videoRef.current !== null && canvasRef.current !== null) {
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            }
            setTimeout(() => { captureFrame() }, 0);
        }
    }
    
    const divRef = useRef<HTMLDivElement>(null);
    return (
        <Box>
            <VideoPlyaer src={props.videoSrc} ref={videoRef} frameCatch={captureFrame} />
            <canvas ref={canvasRef}></canvas>
            <button onClick={() => {
                const rawData = context!.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height);
                const data: FrameData = {
                    data: rawData.data,
                    height: rawData.height,
                    width: rawData.width,
                }
                divRef.current!.innerHTML = JSON.stringify(data);
                videoRef.current?.pause();
                props.uploadFrame(data).then((res) => {
                    videoRef.current?.play();
                    alert(res);
                })
            }}>输出ImgData到Console</button>
            <div ref={divRef} style={{ width: "20rem", overflow: 'hidden' }}>test</div>
        </Box>
    )
}

export default CanvasFrame