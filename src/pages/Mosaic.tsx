import React from "react";
import { useNavigate } from "react-router-dom";
import { setImages, setReady } from "../api/redux/ImageSlice";
import { useAppDispatch } from "../api/redux/store";
import FileOpen from "../components/FileOpen";
import HeaderFrame from "../components/HeaderFrame";
import "../styles/util.css";

const Mosaic = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const nextHandler = () => {
    nav("/images");
    const asyncFn = window.pywebview.api.get_entities();
    asyncFn
      .then((res) => {
        console.log(res);
        dispatch(setImages(res));
        dispatch(setReady());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openHandler = async () => await window.pywebview.api.get_video();

  return (
    <div className="util-page">
      <HeaderFrame>
        <h1>自动马赛克处理</h1>
      </HeaderFrame>
      <FileOpen next={nextHandler} open={openHandler} />
    </div>
  );
};

export default Mosaic;
