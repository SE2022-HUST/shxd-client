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
  onFinish: () => void;
}

const skeletonNum = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const MyImageList: FC<IProps> = ({ data, ready, onFinish: finishHandler }) => {
  // States
  const [width, setWidth] = useState(window.innerWidth);
  const [srces, setSrces] = useState<string[][]>();
  const [col, setCol] = useState(width < 1000 ? 4 : 5);
  const [nowPage, setNowPage] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [imgReady, setImgReady] = useState(false);

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
      // localStorage.setItem("data", JSON.stringify(data));
      setAllPage(data.length);
      console.log(data.length);
      const srTtemp: string[][] = [];
      const listTemp: boolean[][] = [];
      for (let i = 0; i < data.length; i++) {
        srTtemp.push([]);
        listTemp.push([]);
        console.log(i, srTtemp);
        console.log(srTtemp[i]);
        console.log(listTemp);
        console.log(listTemp[i]);

        for (let j = 0; j < data[i].length; j++) {
          listTemp[i].push(false);
          const raw = matrixDecode(data[i][j]);
          const imgData = new ImageData(
            raw,
            data[i][j][0].length,
            data[i][j].length
          );
          if (ctx !== null && canvasRef.current !== null) {
            canvasRef.current.width = data[i][j][0].length;
            canvasRef.current.height = data[i][j].length;
            ctx.putImageData(imgData, 0, 0);
            const src = canvasRef.current.toDataURL("image/png");
            srTtemp[i].push(src);
          }
        }
      }
      setSrces(srTtemp);
      dispatch(setMark(listTemp));
      setImgReady(true);
    }
  }, [ready]);

  const nextPageHandler = () => {
    if (nowPage < allPage - 1) {
      setNowPage(nowPage + 1);
    } else {
      finishHandler();
    }
  };
  const backPageHandler = () => {
    if (nowPage > 0) {
      setNowPage(nowPage - 1);
    }
  };

  return (
    <div className="img-list-container">
      <canvas hidden ref={canvasRef} />
      <ImagePage
        nowPage={nowPage}
        allPage={allPage}
        sktNum={skeletonNum}
        col={col}
        imgs={srces}
        ready={imgReady}
        nextPage={nextPageHandler}
        backPage={backPageHandler}
      />
    </div>
  );
};

export default MyImageList;
