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
  containerSize?: ViewSize;
  hidden?: boolean;
}

export default function CanvasFrame({
  data,
  frameSize,
  containerSize,
  hidden,
}: IProp) {
  // 注意ref必须赋初值null 否则报错
  const ref = useRef<HTMLCanvasElement>(null); // show用于处理后展示container的画面
  const ctx = useCanvas(ref);
  const width = containerSize?.width === undefined ? 800 : containerSize.width;
  const height =
    containerSize?.height === undefined ? 450 : containerSize.height;
  const updateHandler = (data: HTMLCanvasElement) => {
    if (ctx !== null && ref.current !== null) {
      ctx.drawImage(data, 0, 0, width, height);
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
          width={`${width}px`}
          height={`${height}px`}
          ref={ref}
          hidden={hidden === true}
        />
      </div>
    </div>
  );
}
