import React from "react";
import { useNavigate } from "react-router-dom";
import Frame from "react-frame-component";
import "../styles/image.css";
import MyImageList from "../components/ImageList";



const ImageCase = () => {
  const nav = useNavigate();
  return (
    <div className="image-show-case">
      <div>
        <button
          onClick={() => {
            nav(-1);
          }}
        >
          Back
        </button>
      </div>
      <div className="image-show-main">
        <MyImageList />
      </div>
    </div>
  );
};

export default ImageCase;
