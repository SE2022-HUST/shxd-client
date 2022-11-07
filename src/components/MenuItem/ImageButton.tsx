import React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import cn from "classnames";
import "./style.css";

interface IProp {
  name: string;
  src: any;
  onClick: () => void;
}

const ImageButton = (props: IProp) => {
  return (
    <ButtonBase className="img-button-wrapper" onClick={props.onClick}>
      <img className="img-src" src={props.src} />
      <span className={cn("img-backdrop", "MuiImageBackdrop-root")} />
      <span className="img-container">
        <Typography
          component="span"
          variant="subtitle1"
          sx={{ position: "relative", p: 4, pt: 2, pb: 2, color: "white" }}
          fontSize="1.4rem"
        >
          {props.name}
        </Typography>
      </span>
    </ButtonBase>
  );
};

export default ImageButton;
