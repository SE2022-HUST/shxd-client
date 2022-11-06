import { ImageList, Skeleton } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import "./style.css";
import ImageItem from "./ImageItem";

interface IProps {
  data: any[];
  chosen: boolean[];
  setChosen: (index: number) => void;
  ready: boolean;
}

const getSrc = (
  image: string,
  width: number,
  height: number,
  rows = 1,
  cols = 1
) => `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`;

const skeletonNum = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const MyImageList: FC<IProps> = ({ data, chosen, setChosen, ready }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [col, setCol] = useState(width < 1000 ? 4 : 5);
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

  return (
    <div className="img-list-container">
      <ImageList className="image-list" cols={col} gap={4}>
        {ready
          ? data.map((item, index) => (
              <ImageItem
                key={index}
                src={getSrc(item.img, 300, 250)}
                chosen={chosen[index]}
                setChosen={() => {
                  setChosen(index);
                }}
              />
            ))
          : skeletonNum.map((val, index) => (
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

export default MyImageList;
