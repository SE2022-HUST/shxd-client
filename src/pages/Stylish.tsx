import React from "react";
import FileOpen from "../components/FileOpen";
import HeaderFrame from "../components/HeaderFrame";
import "../styles/util.css";

const Stylish = () => {
  return (
    <div className="util-page">
      <HeaderFrame>
        <h1>风格化处理视频</h1>
      </HeaderFrame>
      <FileOpen />
    </div>
  );
};

export default Stylish;
