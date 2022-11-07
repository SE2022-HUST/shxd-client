import React, { FC } from "react";
import cn from "classnames";
import { ImageListItem } from "@mui/material";
import "./style.css";
import ImageMask from "./ImageMask";

interface IProps {
  key: any;
  src: string;
  chosen: boolean;
  setChosen: () => void;
}

const ImageItem: FC<IProps> = ({ key, src, chosen, setChosen }) => {
  const test = () => {
    setChosen();
    console.log(`${key as string} clicked! now: ${String(chosen)}`);
  };
  return (
    <ImageListItem className={cn("image-item", { "image-chosen": chosen })}>
      <img src={src} loading="lazy" onClick={test} />
      <ImageMask onClick={test} display={chosen} />
    </ImageListItem>
  );
};

export default ImageItem;
