import { ImageList, Skeleton } from "@mui/material";
import React, { FC, useState } from "react";
import useGlobalState from "../../api/hooks/useGlobalState";
import { selectMark, setMarkByPage } from "../../api/redux/ImageSlice";
import { useAppDispatch, useAppSelector } from "../../api/redux/store";
import ImageItem from "./ImageItem";
import Pagination from "./Pagination";
import "./style.css";

interface IProps {
  col?: number;
  imgs?: string[][];
  sktNum: number[];
  nowPage: number;
  allPage: number;
  ready: boolean;
  nextPage: () => void;
  backPage: () => void;
}

const ImagePage: FC<IProps> = ({
  col,
  imgs,
  sktNum,
  nowPage,
  allPage,
  ready,
  nextPage,
  backPage,
}) => {
  const chosenList = useAppSelector(selectMark);
  const dispatch = useAppDispatch();
  const [loadProcess, setLoadProcess] = useState<number>();
  useGlobalState({
    name: "setLoadProcess",
    data: (p: number) => {
      setLoadProcess(p);
    },
  });
  return (
    <div className="image-page">
      <Pagination
        now={nowPage}
        total={allPage}
        loading={!ready}
        onNext={nextPage}
        onBack={backPage}
        percentage={loadProcess}
      />
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
