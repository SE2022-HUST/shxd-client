import React, { useState, useRef, useEffect } from "react";
import "./style.css";

export default function CanvasFrame() {
  // 注意ref必须赋初值null 否则报错
  const canvasRef = useRef<HTMLCanvasElement>(null); // show用于处理后展示container的画面
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    if (canvasRef.current !== null) {
      setContext(canvasRef.current.getContext("2d")); // 初始化canvas context
    }
  });

  return (
    <div className="canvas-frame">
      <div className="quickview-canvas">
        <canvas
          id="canvas-quickview-container"
          width="800px"
          height="450px"
          ref={canvasRef}
        ></canvas>
      </div>
    </div>
  );
}
