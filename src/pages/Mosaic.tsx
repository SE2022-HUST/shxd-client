import React from "react";
import { useNavigate } from "react-router-dom";
import FileOpen from "../components/FileOpen";
import HeaderFrame from "../components/HeaderFrame";
import "../styles/util.css";

const Mosaic = () => {
  const nav = useNavigate();
  return (
    <div className="util-page">
      <HeaderFrame>
        <h1>敏感信息自动打码</h1>
      </HeaderFrame>
      <FileOpen
        next={() => {
          nav("/images");
        }}
      />
    </div>
  );
};

export default Mosaic;
