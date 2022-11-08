import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import FileOpen from "../components/FileOpen";
import HeaderFrame from "../components/HeaderFrame";
import "../styles/util.css";
import { useNavigate } from "react-router-dom";
import ActionDialog from "../components/ActionDialog";

const shiftText = ["原画", "超清", "高清", "标清"];

const Compress = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [shift, setShift] = useState<COMPRESS_SHIFT>(0);
  const nav = useNavigate();
  const closeHandler = () => {
    setDialogOpen(false);
  };
  const nextHandler = () => {
    setDialogOpen(true);
  };
  const confirmHandler = () => {
    setDialogOpen(false);
    window.pywebview.api.video_compress(shift);
    // nav("/progress");
  };
  const changeHandler = (event: SelectChangeEvent) => {
    setShift(event.target.value as unknown as number);
  };

  return (
    <div className="util-page">
      <HeaderFrame>
        <h1>压缩你的视频</h1>
      </HeaderFrame>
      <ActionDialog
        open={dialogOpen}
        title="选择压缩等级"
        actions={[
          { name: "取消", action: closeHandler },
          { name: "确定", action: confirmHandler },
        ]}
      >
        <div className="select-form">
          <FormControl fullWidth>
            <InputLabel>等级</InputLabel>
            <Select
              labelId="compress-shift"
              value={shift as unknown as string}
              label="Shift"
              onChange={changeHandler}
            >
              {shiftText.map((text, index) => (
                <MenuItem key={index} value={index}>
                  {text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </ActionDialog>
      <FileOpen next={nextHandler} />
    </div>
  );
};

export default Compress;
