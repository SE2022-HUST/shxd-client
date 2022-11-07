import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/image.css";
import MyImageList from "../components/ImageList";
import HeaderFrame from "../components/HeaderFrame";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../api/redux/store";
import {
  selectImage,
  selectImageReady,
  selectMark,
  clearImage,
} from "../api/redux/ImageSlice";

const ImageCase = () => {
  const nav = useNavigate();
  const ready = useAppSelector(selectImageReady);
  const imgs = useAppSelector(selectImage);
  const chosenList = useAppSelector(selectMark);
  const dispatch = useAppDispatch();
  const [allowNext, setAllowNext] = useState(false);

  const backHandler = () => {
    nav(-1);
    console.log("back");
    dispatch(clearImage());
  };

  const nextHandler = () => {
    if (chosenList !== undefined) {
      window.pywebview.api.send_chosen_entities(chosenList);
      dispatch(clearImage());
    }
    nav("/progress");
  };

  const endHandler = (v: boolean) => {
    setAllowNext(v);
  };

  return (
    <div className="image-show-case">
      <HeaderFrame>
        <h2>请点选你需要隐藏的对象</h2>
        <div className="header-controls">
          <Button
            variant="contained"
            onClick={nextHandler}
            disabled={!allowNext}
          >
            下一步
          </Button>
        </div>
      </HeaderFrame>
      <div className="image-show-main">
        <MyImageList data={imgs} ready={ready} onFinish={nextHandler} onEnd={endHandler} />
      </div>
    </div>
  );
};

export default ImageCase;
