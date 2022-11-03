import React, { useRef, useMemo } from "react";
import useCanvas from "../../api/hooks/useCanvas";
import { matrixDecode } from "../../api/utils";

interface ViewSize {
  width: number;
  height: number;
}

interface IProp {
  data: Uint8ClampedArray;
  frameSize: ViewSize;
  onUpdate: (canvas: HTMLCanvasElement) => void;
}

const Receiver = ({
  data,
  frameSize: frame,
  onUpdate: updateHandler,
}: IProp) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const ctx = useCanvas(ref);

  const imgData = useMemo(
    () => new ImageData(data, frame.width, frame.height),
    [data, frame]
  );
  if (ctx !== null && ref.current !== null) {
    ctx.putImageData(imgData, 0, 0);
    updateHandler(ref.current);
  }
  return (
    <div className="hidden-container">
      <canvas
        hidden
        width={`${frame.width}px`}
        height={`${frame.height}px`}
        ref={ref}
      />
    </div>
  );
};

export default Receiver;
