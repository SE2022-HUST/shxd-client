import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { FrameData } from "../../api/types/backend";
import { matrixDecode } from "../../api/utils";
import TipText from "./TipText";

interface IProps {
  next?: () => void;
  setFrame: (data: FrameData) => void;
}

const ControlPanel: FC<IProps> = ({ next, setFrame }) => {
  const [loading, setLoading] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [saveReady, setSaveReady] = useState(false);
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (videoReady && saveReady) {
      setReady(true);
    }
  });

  const openHandler = () => {
    setLoading(true);
    const syncFn = window.pywebview.api.get_video();
    console.log("call func");
    syncFn
      .then((res) => {
        const frame: FrameData = {
          data: matrixDecode(res),
          height: res.length,
          width: res[0].length,
        };
        setFrame(frame);
        setVideoReady(true);
        console.log("decode finished");
      })
      .catch((err) => {
        console.log(err);
        setVideoReady(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const savePathHandler = () => {
    const asyncFn = window.pywebview.api.get_save_path();
    asyncFn
      .then((res) => {
        console.log(res);
        if (inputRef.current !== null) {
          inputRef.current.value = res;
          setSaveReady(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSaveReady(false);
      });
  };

  return (
    <div className="file-open-bar">
      <div className="process-step">
        <TipText>第一步：选择输出路径</TipText>
        <div className="path-choose-bar">
          <input className="save-path-input" ref={inputRef} readOnly />
          <Button variant="contained" onClick={savePathHandler}>
            选择保存路径
          </Button>
        </div>
      </div>
      <div className="process-step">
        <TipText>第二步：打开视频文件</TipText>
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={openHandler}
        >
          打开
        </LoadingButton>
      </div>
      <div className="process-step">
        <TipText>第三步：一切就绪后，在下一步中选择需要隐藏的对象</TipText>
        <Button variant="contained" disabled={!ready} onClick={next}>
          下一步
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;