/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import cn from "classnames";
import CanvasFrame from "./CanvasFrame";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";

const FileOpen = () => {
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(450);
  const [loading, setLoading] = useState(false);
  const [frame, setFrame] = useState<number[][][] | undefined>(undefined);
  const openHandler = () => {
    setLoading(true);
    const syncFn = window.pywebview.api.open_file_dialog();
    syncFn
      .then((res) => {
        setFrame(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className={cn("util-wrapper")}>
      <CanvasFrame
        data={frame}
        frameSize={
          frame === undefined
            ? undefined
            : { width: frame[0].length, height: frame.length }
        }
        containerSize={{ width: canvasWidth, height: canvasHeight }}
      />
      <div className={cn("button-pannel", "file-open-bar")}>
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={openHandler}
        >
          打开
        </LoadingButton>
        <Button variant="contained">下一步</Button>
      </div>
    </div>
  );
};

export default FileOpen;
