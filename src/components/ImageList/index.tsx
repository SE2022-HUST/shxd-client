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
  onEnd: (v: boolean) => void;
}

const MyImageList: FC<IProps> = ({
  data,
  ready,
  onFinish: finishHandler,
  onEnd,
}) => {
  const col = 4;
  // States
  const [srces, setSrces] = useState<string[][]>();
  const [nowPage, setNowPage] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [imgReady, setImgReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useCanvas(canvasRef);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (nowPage === allPage - 1) {
      onEnd(true);
    } else {
      onEnd(false);
    }
  }, [nowPage]);

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
