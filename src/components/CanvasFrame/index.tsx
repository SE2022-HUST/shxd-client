import { Button } from "@mui/material";
import Box from "@mui/material/Box/Box";
import React, { useState, useRef, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";

interface IProps {
  videoSrc: string | undefined;
  uploadFrame: (data: any) => Promise<any>;
}

function CanvasFrame(props: IProps) {
  // 注意ref必须赋初值null 否则报错
  const originCanvasRef = useRef<HTMLCanvasElement>(null); // origin用于捕捉视频帧
  const containerCanvasRef = useRef<HTMLCanvasElement>(null); // container用于接收传回的画面
  const showCanvasRef = useRef<HTMLCanvasElement>(null); // show用于处理后展示container的画面
  const videoRef = useRef<HTMLVideoElement>(null);
  const [contextBefore, setContextBefore] =
    useState<CanvasRenderingContext2D | null>(null);
  const [contextAfter, setContextAfter] =
    useState<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    // originCanvasRef.current.width = videoRef.current.videoWidth;
    // originCanvasRef.current.height = videoRef.current.videoHeight;
    // containerCanvasRef.current.width = videoRef.current.videoWidth;
    // containerCanvasRef.current.height = videoRef.current.videoHeight;
    if (originCanvasRef.current !== null) {
      setContextBefore(originCanvasRef.current.getContext("2d"));
    }
    if (showCanvasRef.current !== null) {
      setContextAfter(showCanvasRef.current.getContext("2d"));
    }
    void videoRef.current?.play();
  });

  const captureFrame = () => {
    if (videoRef.current !== null) {
      if (videoRef.current.paused || videoRef.current.ended) {
        return;
      }
      if (
        contextBefore !== null &&
        videoRef.current !== null &&
        originCanvasRef.current !== null
      ) {
        contextBefore.drawImage(
          videoRef.current,
          0,
          0,
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        );
      }
      setTimeout(() => {
        captureFrame();
      }, 0);
    }
  };

  return (
    <div>
      <Box className="canvas-frame">
        <VideoPlayer
          src={props.videoSrc}
          ref={videoRef}
          frameCatch={captureFrame}
        />
        <Box className="hidden-container">
          <canvas
            hidden
            width="1280px"
            height="720px"
            ref={originCanvasRef}
          ></canvas>
          <canvas
            hidden
            width="1280px"
            height="720px"
            ref={containerCanvasRef}
          ></canvas>
        </Box>
        <Box className="quickview-container">
          <canvas
            id="canvas-quickview-container"
            width="800px"
            height="450px"
            ref={showCanvasRef}
          ></canvas>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
        <Button>开始</Button>
      </Box>
    </div>
  );
}

export default CanvasFrame;
