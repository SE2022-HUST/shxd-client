import { useState, useCallback, useEffect } from "react";

function useWindowSize(): number[] {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const memo = useCallback(() => {
    window.onresize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
  }, []);
  useEffect(() => {
    memo();
  }, [memo]);

  return [width, height];
}

export default useWindowSize;
