import { LinearProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalState from "../api/hooks/useGlobalState";
import CanvasFrame from "../components/CanvasFrame";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../styles/progress.css";
import { useAppSelector } from "../api/redux/store";
import { selectSavePath } from "../api/redux/ImageSlice";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { FrameData } from "../api/types/types";
import { matrixDecode } from "../api/utils";

const Progress = () => {
  const [progress, setProgress] = useState(0.0);
  const [finished, setFinished] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const savePath = useAppSelector(selectSavePath);
  const [frame, setFrame] = useState<Uint8ClampedArray>();
  const [frameWidth, setFrameWidth] = useState<number>();
  const [frameHeight, setFrameHeight] = useState<number>();
  const setFrameData = (data: FrameData) => {
    setFrame(data.data);
    setFrameHeight(data.height);
    setFrameWidth(data.width);
  };
  const nav = useNavigate();
  useGlobalState({
    name: "setProgress",
    data: (p: number) => {
      setProgress(p);
    },
  });
  const fn = async () => {
    const raw = await window.pywebview.api.get_cur_frame();
    if (raw?.[0] !== undefined) {
      const frame: FrameData = {
        data: matrixDecode(raw),
        height: raw.length,
        width: raw[0].length,
      };
      setFrameData(frame);
    }
    if (progress !== 100) {
      void fn();
    }
  };
  const memo = useCallback(() => {
    void fn();
  }, []);
  useEffect(() => {
    memo();
  }, [memo]);

  const closeHandler = () => {
    setDialogOpen(false);
  };

  const finishHandler = () => {
    console.log("process finish!");
    setDialogOpen(true);
    setFinished(true);
  };

  const backHandler = () => {
    setDialogOpen(false);
    setFinished(false);
    nav("/");
  };

  const openDirHandler = () => {};

  const openFileHandler = () => {};

  useEffect(() => {
    if (progress >= 100) {
      setProgress(100);
      finishHandler();
    }
  }, [progress]);

  return (
    <div className="progress-show-case">
      <h1 className="progress-title">处理中...</h1>
      <CanvasFrame
        containerSize={{ width: 800, height: 450 }}
        data={frame}
        frameSize={
          frameWidth !== undefined && frameHeight !== undefined
            ? { width: frameWidth, height: frameHeight }
            : undefined
        }
      />
      <div className="progress-wrapper">
        <LinearProgress variant="determinate" value={progress} />
      </div>
      <Dialog open={dialogOpen} onClose={closeHandler}>
        <DialogTitle>
          <DoneOutlineIcon sx={{ pt: 1 }} fontSize="small" /> 处理完成
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{`视频已保存到 ${savePath}`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={openFileHandler}>打开视频</Button>
          <Button onClick={openDirHandler}>打开目录</Button>
          <Button onClick={closeHandler}>关闭</Button>
        </DialogActions>
      </Dialog>
      <h2>{`${progress}%`}</h2>
      {finished ? (
        <Button variant="contained" onClick={backHandler}>
          回到主页
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Progress;
