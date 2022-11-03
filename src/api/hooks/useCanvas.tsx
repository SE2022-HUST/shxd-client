import { useEffect, useState } from "react";

export default function useCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>
): CanvasRenderingContext2D | null {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  useEffect(() => {
    if (canvasRef.current !== null) {
      setContext(canvasRef.current.getContext("2d")); // 初始化canvas context
    }
  });
  return context;
}
