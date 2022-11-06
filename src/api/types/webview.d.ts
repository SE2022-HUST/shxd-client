interface Window {
  pywebview: {
    api: {
      // 前端向后端发送信息
      send_frame: (data: number[][][]) => Promise<number[][][]>; // 发送一帧
      send_chosen_entities: (data: boolean[]) => void; // 发送实体清单
      // 前端调用后端功能
      open_video: () => Promise<number[][][]>;
      test: () => void;
    };
    state: any;
  };
}
