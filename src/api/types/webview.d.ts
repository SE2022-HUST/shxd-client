interface Window {
  pywebview: {
    api: {
      // 前端向后端发送信息
      send_frame: (data: RawImage) => Promise<RawImage>; // 发送一帧 返回处理后的一帧
      send_chosen_entities: (data: boolean[][]) => void; // 发送选中的实体清单
      // 前端调用后端功能
      get_video: () => Promise<RawImage>;
      get_save_path: () => Promise<string>;
      get_entities: () => Promise<RawImage[][]>;

      test: () => void;
    };
    state: any;
  };
}
