/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import cn from "classnames";
import CanvasFrame from "./CanvasFrame";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { matrixDecode } from "../api/utils";
import useGlobalState, { StateUnit } from "../api/hooks/useGlobalState";

const FileOpen = () => {
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(450);
  const [loading, setLoading] = useState(false);
  const [frame, setFrame] = useState<Uint8ClampedArray | undefined>(undefined);
  const [frameWidth, setFrameWidth] = useState<number | undefined>(undefined);
  const [frameHeight, setFrameHeight] = useState<number | undefined>(undefined);
  const openHandler = () => {
    setLoading(true);
    const syncFn = window.pywebview.api.open_file_dialog();
    console.log("call func");
    syncFn
      .then((res) => {
        setFrame(matrixDecode(res));
        setFrameHeight(res.length);
        setFrameWidth(res[0].length);
        console.log("decode finished");
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
          frameWidth !== undefined && frameHeight !== undefined
            ? { width: frameWidth, height: frameHeight }
            : undefined
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
