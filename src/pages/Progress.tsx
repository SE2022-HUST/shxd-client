import { LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalState from "../api/hooks/useGlobalState";
import CanvasFrame from "../components/CanvasFrame";
import "../styles/progress.css";

const Progress = () => {
  const [progress, setProgress] = useState(0.0);
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
  return (
    <div className="progress-show-case">
      <div>
        <Link to="/menu">Back to Index</Link>
      </div>
      <h1 className="progress-title">处理中...</h1>
      <CanvasFrame containerSize={{ width: 800, height: 450 }} />
      <div className="progress-wrapper">
        <LinearProgress variant="determinate" value={progress} />
      </div>
      <h2>{`${progress}%`}</h2>
      <div>
        <button onClick={test}>测试</button>
      </div>
    </div>
  );
};

export default Progress;
