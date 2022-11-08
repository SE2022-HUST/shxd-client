import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionDialog from "../components/ActionDialog";
import FileOpen from "../components/FileOpen";
import HeaderFrame from "../components/HeaderFrame";
import "../styles/util.css";

const Stylish = () => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [style, setStyle] = useState(0);
  const styleText = ["默认", "卡通"];

  const nav = useNavigate();
  const closeHandler = () => {
    console.log(styleText[style]);
    setDialogOpen(false);
  };
  const nextHandler = () => {
    console.log(styleText[style]);
    // nav("/progress");
  };
  const changeHandler = (event: SelectChangeEvent) => {
    setStyle(event.target.value as unknown as number);
  };
  const openHandler = async () => await window.pywebview.api.get_video();

  return (
    <div className="util-page">
      <HeaderFrame>
        <h1>风格化处理视频</h1>
      </HeaderFrame>
      <ActionDialog
        open={dialogOpen}
        title="选择处理风格"
        actions={[{ name: "确定", action: closeHandler }]}
      >
        <div className="select-form">
          <FormControl fullWidth>
            <InputLabel>等级</InputLabel>
            <Select
              labelId="compress-shift"
              value={style as unknown as string}
              label="Shift"
              onChange={changeHandler}
            >
              {styleText.map((text, index) => (
                <MenuItem key={index} value={index}>
                  {text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </ActionDialog>
      <FileOpen open={openHandler} next={nextHandler} />
    </div>
  );
};

export default Stylish;
