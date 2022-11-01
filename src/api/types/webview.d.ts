interface Window {
  pywebview: {
    api: {
      fullscreen: () => void;
      send_file: (data: number[][][]) => Promise<number[][][]>;
      open_file_dialog: () => Promise<string[]>;
    };
  };
}
