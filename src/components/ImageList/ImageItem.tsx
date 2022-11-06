import React, { FC } from "react";
import cn from "classnames";
import { ImageListItem } from "@mui/material";
import "./style.css";
import ImageBar from "./ImageBar";

interface IProps {
  key: string;
  src: string;
  chosen: boolean;
  setChosen: () => void;
}

const ImageItem: FC<IProps> = ({ key, src, chosen, setChosen }) => {
  const test = () => {
    setChosen();
    console.log(`${key} clicked! now: ${String(chosen)}`);
  };
  return (
    <ImageListItem
      className={cn("image-item", { "image-chosen": chosen })}
      key={key}
    >
      <img src={src} loading="lazy" onClick={test} />
      <ImageBar onClick={test} chosen={chosen} />
    </ImageListItem>
  );
};

export default ImageItem;
