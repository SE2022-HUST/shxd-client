import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { setSavePath } from "../../api/redux/ImageSlice";
import { useAppDispatch } from "../../api/redux/store";
import { FrameData } from "../../api/types/types";
import { matrixDecode } from "../../api/utils";
import TipText from "./TipText";
import "./style.css";

interface IProps {
  next?: () => void;
  setFrame: (data: FrameData) => void;
  openApi: () => Promise<RawImage>;
}

const ControlPanel: FC<IProps> = ({ next, setFrame, openApi }) => {
  const [loading, setLoading] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [saveReady, setSaveReady] = useState(false);
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videoReady && saveReady) {
      setReady(true);
    }
  });

  const openHandler = () => {
    setLoading(true);
    const syncFn = openApi();
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
        dispatch(setSavePath(res));
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
            打开
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
          打开视频
        </LoadingButton>
      </div>
      <div className="process-step">
        <TipText>第三步：一切就绪后，点击下一步</TipText>
        <Button variant="contained" disabled={next === undefined || !ready} onClick={next}>
          下一步
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
