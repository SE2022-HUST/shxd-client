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
  return (
    <div className="util-page">
      <HeaderFrame>
        <h1>敏感信息自动打码</h1>
      </HeaderFrame>
      <FileOpen next={nextHandler} />
    </div>
  );
};

export default Mosaic;
