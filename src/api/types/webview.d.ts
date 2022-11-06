interface Window {
  pywebview: {
    api: {
      // 前端向后端发送信息
      send_frame: (data: number[][][]) => Promise<number[][][]>; // 发送一帧
      send_chosen_entities: (data: boolean[]) => void; // 发送实体清单
      // 前端调用后端功能
      get_video: () => Promise<number[][][]>;
      get_save_path: () => Promise<string>;
      get_entities: () => Promise<any>;

      test: () => void;
    };
    state: any;
  };
}
