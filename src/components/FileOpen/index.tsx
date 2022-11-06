/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import cn from "classnames";
import CanvasFrame from "../CanvasFrame";
import "../../styles/util.css";
import ControlPanel from "./ControlPanel";
import { FrameData } from "../../api/types/types";

const scale = 40;

const FileOpen = ({ next }: { next?: () => void }) => {
  const [canvasWidth, setCanvasWidth] = useState(16 * scale);
  const [canvasHeight, setCanvasHeight] = useState(9 * scale);
  const [frame, setFrame] = useState<Uint8ClampedArray>();
  const [frameWidth, setFrameWidth] = useState<number>();
  const [frameHeight, setFrameHeight] = useState<number>();

  const setFrameData = (data: FrameData) => {
    setFrame(data.data);
    setFrameHeight(data.height);
    setFrameWidth(data.width);
  };
  return (
    <div className={cn("util-wrapper")}>
      <CanvasFrame
        data={frame}
        frameSize={
          frameWidth !== undefined && frameHeight !== undefined
            ? { width: frameWidth, height: frameHeight }
            : undefined
        }
        containerSize={{ width: canvasWidth, height: canvasHeight }}
      />
      <ControlPanel next={next} setFrame={setFrameData} />
    </div>
  );
};

export default FileOpen;
