import React from "react";
import CanvasFrame from "../components/CanvasFrame";
import FileOpen from "../components/FileOpen";
import HeaderFrame from "../components/HeaderFrame";
import "../styles/util.css";

const Compress = () => {
  return (
    <div className="util-page">
      <HeaderFrame>
        <h1>压缩你的视频</h1>
      </HeaderFrame>
      <FileOpen />
    </div>
  );
};

export default Compress;
