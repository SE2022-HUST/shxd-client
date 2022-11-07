import { CircularProgress, ImageList, Skeleton } from "@mui/material";
import React, { FC } from "react";
import { selectMark, setMarkByPage } from "../../api/redux/ImageSlice";
import { useAppDispatch, useAppSelector } from "../../api/redux/store";
import ImageItem from "./ImageItem";
import "./style.css";

interface IProps {
  col?: number;
  imgs?: string[][];
  sktNum: number[];
  nowPage: number;
  allPage: number;
  ready: boolean;
}

const ImagePage: FC<IProps> = ({
  col,
  imgs,
  sktNum,
  nowPage,
  allPage,
  ready,
}) => {
  const chosenList = useAppSelector(selectMark);
  const dispatch = useAppDispatch();
  return (
    <div className="image-page">
      <div className="image-pagination">
        {ready ? (
          <h1>{`${nowPage}/${allPage}`}</h1>
        ) : (
          <div className="loading-text">
            <CircularProgress />
            <span>加载中</span>
          </div>
        )}
      </div>
      <ImageList className="image-list" cols={col} gap={4}>
        {ready && imgs !== undefined && chosenList !== undefined
          ? imgs[nowPage].map((src, index) => (
              <ImageItem
                key={index}
                src={src}
                chosen={chosenList[nowPage][index]}
                setChosen={() => {
                  dispatch(setMarkByPage({ page: nowPage, index }));
                }}
              />
            ))
          : sktNum.map((val, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                animation="wave"
                width={300}
                height={250}
              />
            ))}
      </ImageList>
    </div>
  );
};

export default ImagePage;
