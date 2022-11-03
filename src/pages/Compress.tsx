import React from "react";
import CanvasFrame from "../components/CanvasFrame";
import HeaderFrame from "../components/HeaderFrame";
import "../styles/index.css";

const Compress = () => {
  return (
    <div className="util-page">
      <HeaderFrame>
        <h1>压缩你的视频</h1>
      </HeaderFrame>
      <CanvasFrame />
    </div>
  );
};

export default Compress;
