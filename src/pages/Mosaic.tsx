import React from "react";
import { useNavigate } from "react-router-dom";
import FileOpen from "../components/FileOpen";
import HeaderFrame from "../components/HeaderFrame";
import "../styles/util.css";

const Mosaic = () => {
  const nav = useNavigate();
  const nextHandler = () => {
    nav("/images");
    const f = window.pywebview.api.get_entities();
    f.then((res) => {
      console.log(res);
    }).catch((err) => {
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
