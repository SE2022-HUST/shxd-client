enum COMPRESS_SHIFT {
  RAW = 0,
  LOW,
  MID,
  HIGH,
}
interface Window {
  pywebview: {
    api: {
      // 前端向后端发送信息
      send_chosen_entities: (data: boolean[][]) => void; // 发送选中的实体清单
      // 前端调用后端功能
      get_video: () => Promise<RawImage>; // 调用文件输入框 返回第一帧
      get_cur_frame: () => Promise<RawImage>; // 返回当前正在处理的帧
      get_save_path: () => Promise<string>;
      get_entities: () => Promise<RawImage[][]>;
      open_fp: (path: string) => void;
      video_compress: (shift: COMPRESS_SHIFT) => void;
    };
    state: any;
  };
  pywebviewready: any;
}
