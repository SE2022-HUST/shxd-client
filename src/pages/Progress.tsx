import { LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalState from "../api/hooks/useGlobalState";
import CanvasFrame from "../components/CanvasFrame";
import "../styles/progress.css";

const Progress = () => {
  const [progress, setProgress] = useState(0.0);
  const nav = useNavigate();
  useGlobalState(
    { name: "progress", data: progress },
    {
      name: "setProgress",
      data: (p: number) => {
        setProgress(p);
      },
    }
  );
  const test = () => {
    window.pywebview.api.test();
  };
  const finishHandler = () => {
    console.log("process finish!");
    setTimeout(() => {
      nav("/");
    }, 1000);
  };
  useEffect(() => {
    if (progress >= 100) {
      setProgress(100);
      finishHandler();
    }
  }, [progress]);
  return (
    <div className="progress-show-case">
      <h1 className="progress-title">处理中...</h1>
      <CanvasFrame containerSize={{ width: 800, height: 450 }} />
      <div className="progress-wrapper">
        <LinearProgress variant="determinate" value={progress} />
      </div>
      <h2>{`${progress}%`}</h2>
      <div>
        <button onClick={test}>完成</button>
      </div>
    </div>
  );
};

export default Progress;
