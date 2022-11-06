import React, { FC } from "react";
import CheckIcon from "@mui/icons-material/Check";
import "./style.css";

interface IProps {
  onClick?: () => void;
  display: boolean;
}

const ImageMask: FC<IProps> = ({ onClick, display }) => {
  return (
    <div className="mask" onClick={onClick}>
      {display ? (
        <CheckIcon sx={{ color: "#32e81e" }} fontSize="large" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageMask;
