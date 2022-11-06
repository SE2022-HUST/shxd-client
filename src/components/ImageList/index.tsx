import { ImageList } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import "./style.css";
import ImageItem from "./ImageItem";

interface IProps {
  data: any[];
  chosen: boolean[];
  setChosen: (index: number) => void;
}

const getSrc = (
  image: string,
  width: number,
  height: number,
  rows = 1,
  cols = 1
) => `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`;

const MyImageList: FC<IProps> = ({ data, chosen, setChosen }) => {
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
        {data.map((item, index) => (
          <ImageItem
            key={String(index)}
            src={getSrc(item.img, 300, 250)}
            chosen={chosen[index]}
            setChosen={() => {
              setChosen(index);
            }}
          />
        ))}
      </ImageList>
    </div>
  );
};

export default MyImageList;