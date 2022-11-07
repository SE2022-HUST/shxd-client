/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from "react";
import CanvasFrame from "../CanvasFrame";
import "./style.css";
import ControlPanel from "./ControlPanel";
import { FrameData } from "../../api/types/types";
import useWindowSize from "../../api/hooks/useWindowSize";
import useCanvasSize from "../../api/hooks/useCanvasSize";

interface IProps {
  next?: () => void;
}

const FileOpen: FC<IProps> = ({ next }) => {
  const [frame, setFrame] = useState<Uint8ClampedArray>();
  const [frameWidth, setFrameWidth] = useState<number>();
  const [frameHeight, setFrameHeight] = useState<number>();
  const [canvasWidth, canvasHeight] = useCanvasSize(0.4);

  const setFrameData = (data: FrameData) => {
    setFrame(data.data);
    setFrameHeight(data.height);
    setFrameWidth(data.width);
  };
  return (
    <div className="util-wrapper">
      <div className="canvas-wrapper">
        <CanvasFrame
          data={frame}
          frameSize={
            frameWidth !== undefined && frameHeight !== undefined
              ? { width: frameWidth, height: frameHeight }
              : undefined
          }
          containerSize={{ width: canvasWidth, height: canvasHeight }}
        />
      </div>
      <ControlPanel next={next} setFrame={setFrameData} />
    </div>
  );
};

export default FileOpen;
