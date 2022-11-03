import React, { useState } from "react";
import cn from "classnames";
import CanvasFrame from "./CanvasFrame";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";

const FileOpen = () => {
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(450);
  const openHandler = () => {
    void window.pywebview.api.open_file_dialog();
  };
  return (
    <div className={cn("util-wrapper")}>
      <CanvasFrame
        containerSize={{ width: canvasWidth, height: canvasHeight }}
      />
      <div className={cn("button-pannel", "file-open-bar")}>
        <LoadingButton variant="contained" onClick={openHandler}>
          打开
        </LoadingButton>
        <Button variant="contained">下一步</Button>
      </div>
    </div>
  );
};

export default FileOpen;
