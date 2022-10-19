import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Box from '@mui/material/Box/Box';
import React, { useState, useRef, useEffect } from 'react';
import { FrameData } from '../../Apis/Types';
import { matrixEncode, matrixDecode } from '../../Apis/Utils';
import VideoPlyaer from './VideoPlayer';

interface IProps {
    videoSrc: string | undefined,
    uploadFrame: (data: any) => Promise<any>,
}

function CanvasFrame(props: IProps) {
    const originCanvasRef = useRef<HTMLCanvasElement>(null); // 注意ref必须赋初值null 否则报错
    const containerCanvasRef = useRef<HTMLCanvasElement>(null);
    const processedCanvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [contextBefore, setContextBefore] = useState<CanvasRenderingContext2D | null>(null)
    const [contextAfter, setContextAfter] = useState<CanvasRenderingContext2D | null>(null)
    useEffect(() => {
        if (originCanvasRef.current !== null) {
            setContextBefore(originCanvasRef.current.getContext('2d'));
        }
        if (processedCanvasRef.current !== null) {
            setContextAfter(processedCanvasRef.current.getContext('2d'));
        }
        videoRef.current?.play();

    })

    const captureFrame = () => {
        if (videoRef.current !== null) {
            if (videoRef.current.paused || videoRef.current.ended) {
                return;
            }
            if (contextBefore !== null && videoRef.current !== null && originCanvasRef.current !== null) {
                contextBefore.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
            }
            setTimeout(() => { captureFrame() }, 0);
        }
    }
    
    const canvasStyle = {
        // marginRight: '2rem',
        // marginLeft: '2rem',
        // width: `${videoRef.current.videoWidth}px`,
        // height: `${videoRef.current.videoHeight}px`,
    }

    const testHandler = () => {
        if(videoRef.current?.ended === true) {
            alert("视频已结束！")
            return;
        }
        if(videoRef.current === null) {
            return;
        }
        videoRef.current?.pause();
        const height = videoRef.current.videoHeight;
        const width = videoRef.current.videoWidth;
        const rawData = contextBefore!.getImageData(0, 0, width, height);
        const data: FrameData = {
            data: matrixEncode(rawData),
            height: rawData.height,
            width: rawData.width,
        }
        console.log(`origin: [${data.width}, ${data.height}]`);
        props.uploadFrame(data)
        .then((res) => {
            // alert(res);
            const retData = matrixDecode(res);
            const newData = new ImageData(retData, data.width, data.height);
            console.log(`ret: [${newData.width}, ${newData.height}]`);
            if(contextAfter !== null && processedCanvasRef.current !== null) {
                const frameWidth = processedCanvasRef.current.width;
                const frameHeight = processedCanvasRef.current.height;
                if (containerCanvasRef.current !== null) {
                    const ctx = containerCanvasRef.current.getContext('2d');
                    ctx!.putImageData(newData, 0, 0);
                    contextAfter.drawImage(containerCanvasRef.current, 0, 0, frameWidth, frameHeight)
                }        
            }
            videoRef.current?.play();
            setTimeout(() => {testHandler()}, 0);
        });
    }
    
    return (
        <div>
            <Box className='canvas-frame'>
                <VideoPlyaer src={props.videoSrc} ref={videoRef} frameCatch={captureFrame} />
                <Box className='hidden-container'>
                    <canvas hidden width="1920px" height="1080px" style={canvasStyle} ref={originCanvasRef}></canvas>
                    <canvas hidden width="1920px" height="1080px" style={canvasStyle} ref={containerCanvasRef}></canvas>
                </Box>
                <Box className='quickview-container'>
                    <canvas id='canvas-quickview-container' width="800px" height="450px" style={canvasStyle} ref={processedCanvasRef}></canvas>
                </Box>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: '1rem'}}>
                <Button onClick={testHandler}>测试</Button>

            </Box>
        </div>
    )
}

export default CanvasFrame