import React, { useRef } from "react";
import useCanvas from "../../api/hooks/useCanvas";
import Receiver from "./Receiver";
import "./style.css";

interface ViewSize {
  width: number;
  height: number;
}

interface IProp {
  data?: Uint8ClampedArray;
  frameSize?: ViewSize;
  containerSize: ViewSize;
}

export default function CanvasFrame({ data, frameSize, containerSize }: IProp) {
  // 注意ref必须赋初值null 否则报错
  const ref = useRef<HTMLCanvasElement>(null); // show用于处理后展示container的画面
  const ctx = useCanvas(ref);
  const updateHandler = (data: HTMLCanvasElement) => {
    if (ctx !== null && ref.current !== null) {
      const w = containerSize.width;
      const h = containerSize.height;
      ctx.drawImage(data, 0, 0, w, h);
    }
  };
  return (
    <div className="canvas-frame">
      <div className="quickview-canvas">
        {data !== undefined && frameSize !== undefined ? (
          <Receiver
            data={data}
            frameSize={frameSize}
            onUpdate={updateHandler}
          />
        ) : (
          <></>
        )}
        <canvas
          width={`${containerSize.width}px`}
          height={`${containerSize.height}px`}
          ref={ref}
        />
      </div>
    </div>
  );
}
