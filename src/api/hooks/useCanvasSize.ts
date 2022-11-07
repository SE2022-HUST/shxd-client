import { useState, useEffect } from "react";
import useWindowSize from "./useWindowSize";

function useCanvasSize(scale: number): number[] {
  const [windowWidth, windowHeight] = useWindowSize();
  const [canvasWidth, setCanvasWidth] = useState(windowWidth * scale);
  const [canvasHeight, setCanvasHeight] = useState((canvasWidth / 16) * 9);
  useEffect(() => {
    setCanvasWidth(windowWidth * scale);
    setCanvasHeight((canvasWidth / 16) * 9);
  }, [windowWidth, windowHeight]);
  return [canvasWidth, canvasHeight];
}

export default useCanvasSize;
