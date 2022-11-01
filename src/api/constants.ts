import spys from "../assets/1.png";
import fgh from "../assets/2.png";
import zddm from "../assets/3.png";

interface EntryNode {
  name: string;
  pic?: any;
  url: string;
}

export const entries: EntryNode[] = [
  {
    name: "视频压缩",
    pic: spys,
    url: "compress",
  },
  {
    name: "风格化处理",
    pic: fgh,
    url: "stylish",
  },
  {
    name: "自动打码",
    pic: zddm,
    url: "mossaic",
  },
];
