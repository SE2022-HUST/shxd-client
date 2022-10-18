import Box from '@mui/material/Box/Box';
import React, { useState, useRef, useEffect } from 'react';
import VideoPlyaer from './VideoPlayer';

interface IProps {
    videoSrc: string | undefined,
}

function CanvasFrame(props: IProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null); // 注意ref必须赋初值null 否则报错
    const videoRef = useRef<HTMLVideoElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
    useEffect(() => {
        if(canvasRef.current !== null) {
            setContext(canvasRef.current.getContext('2d'));
        }
    })

    const captureFrame = () => {
        if(context !== null && videoRef.current !== null && canvasRef.current !== null) {
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }

    const getVideoFrame = () => {
        if(videoRef.current !== null) {
            if(videoRef.current.paused || videoRef.current.ended) {
                return;
            }
            captureFrame();
            setTimeout(()=>{getVideoFrame()}, 0);
        }
    }
    // var img = new Image()
    // //设置图片地址
    // img.src = "img/1.png"
    // var scale = 0.5
    // img.onload = function () {
    //     //设置宽高
    //     var w = Math.floor(img.width * scale), h = Math.floor(img.height * scale)
    //     //获取图片数据
    //     var imgData = ctx.getImgData(0, 0, w, h)
    //     //存储颜色列表
    //     var list = []
    //     for (var i = 0; i < imgData.data.length; i += 4) {
    //         list.push(
    //             `#${(imgData.data[i])}${(imgData.data[i + 1])}${(imgData.data[i + 2])}${(imgData.data[i + 3])}`
    //         )
    //     }
    //     //展示像素矩阵
    //     var box = document.getElementById("box")
    //     var data = new Array()
    //     for (var i = 0; i < h; i++) {
    //         //创建行数组
    //         data[i] = new Array()
    //         var row//这不知道为啥报错？？拆成两行就不报错了
    //         row = document.createElement("div")
    //         row.style.display = 'flex'
    //         for (var j = 0; j < w; j++) {
    //             //创建每一个像素块
    //             data[i][j] = list[i * w + j]
    //             var cell = document.createElement("div")
    //             cell.style.background = data[i][j]
    //             cell.style.width = '10px'
    //             cell.style.height = '10px'
    //             cell.setAttribute("id", `${i}_${j}`)
    //             row.append(cell)
    //         }
    //         (box as any).append(row)
    //     }
    //     //像素放入文本框
    //     var e = document.createElement('textarea')
    //     e.value = JSON.stringify(list);//不知道为啥必须加";"？？
    //     (box as any).append(e)
    // }

    return (
        <Box>
            <VideoPlyaer src={props.videoSrc} ref={videoRef} frameCatch={getVideoFrame} />
            <canvas ref={canvasRef}></canvas>
        </Box>
    )
}

export default CanvasFrame