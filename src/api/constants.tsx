import React from "react";
import spys from "../assets/1.png";
import fgh from "../assets/2.png";
import zddm from "../assets/3.png";
import HomeIcon from "@mui/icons-material/Home";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import SecurityIcon from "@mui/icons-material/Security";

export interface EntryNode {
  name: string;
  pic?: any;
  url: string;
  icon?: JSX.Element;
}

export const menuBlackList = ["/", "/images"];
export const menuWhiteList = ["/compress", "/stylish", "/mosaic"];

export const entries: EntryNode[] = [
  {
    name: "主页",
    url: "/",
    icon: <HomeIcon />,
  },
  {
    name: "视频压缩",
    pic: spys,
    url: "compress",
    icon: <FolderZipIcon />,
  },
  {
    name: "风格化处理",
    pic: fgh,
    url: "stylish",
    icon: <FormatPaintIcon />,
  },
  {
    name: "自动打码",
    pic: zddm,
    url: "mosaic",
    icon: <SecurityIcon />,
  },
];
