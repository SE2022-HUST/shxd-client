import React from "react";
import FileOpen from "../components/FileOpen";
import HeaderFrame from "../components/HeaderFrame";
import "../styles/util.css";

const Mosaic = () => {
  return (
    <div className="util-page">
      <HeaderFrame>
        <h1>敏感信息自动打码</h1>
      </HeaderFrame>
      <FileOpen />
    </div>
  );
};

export default Mosaic;
