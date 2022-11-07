import React, { FC, useEffect, useRef, useState } from "react";
import "./style.css";
import { matrixDecode } from "../../api/utils";
import useCanvas from "../../api/hooks/useCanvas";
import ImagePage from "./ImagePage";
import { useAppDispatch } from "../../api/redux/store";
import { setMark } from "../../api/redux/ImageSlice";

interface IProps {
  data?: RawImage[][];
  ready: boolean;
}

const skeletonNum = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const MyImageList: FC<IProps> = ({ data, ready, ...props }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [srces, setSrces] = useState<string[][]>();
  const [col, setCol] = useState(width < 1000 ? 4 : 5);
  const [nowPage, setNowPage] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useCanvas(canvasRef);
  const dispatch = useAppDispatch();
  const getColNum = () => {
    if (width < 1000) {
      setCol(4);
    } else {
      setCol(5);
    }
  };
  useEffect(() => {
    window.onresize = () => {
      setWidth(window.innerWidth);
      getColNum();
    };
  });

  useEffect(() => {
    if (ready && data !== undefined) {
      setAllPage(data.length);
      const temp = new Array<string[]>(data.length);
      const listTemp = new Array<boolean[]>(data.length);
      for (let i = 0; i < data.length; i++) {
        temp[i] = new Array<string>(data[i].length);
        listTemp[i] = new Array<boolean>(data[i].length);
        for (let j = 0; j < data[i].length; i++) {
          listTemp[i][j] = false;
          const raw = matrixDecode(data[i][j]);
          const imgData = new ImageData(
            raw,
            data[i][j][0].length,
            data[i][j].length
          );
          if (ctx !== null && canvasRef.current !== null) {
            ctx.putImageData(imgData, 0, 0);
            const src = canvasRef.current.toDataURL("image/png");
            temp[i][j] = src;
          }
        }
      }
      setSrces(temp);
      dispatch(setMark(listTemp));
    }
  }, [ready]);

  return (
    <div className="img-list-container">
      <canvas hidden width="300px" height="250" ref={canvasRef} />
      <ImagePage
        nowPage={nowPage}
        allPage={allPage}
        sktNum={skeletonNum}
        col={col}
        imgs={srces}
        ready={ready}
        {...props}
      />
    </div>
  );
};

export default MyImageList;
