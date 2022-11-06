interface Window {
  pywebview: {
    api: {
      trans_frame: (data: number[][][]) => Promise<number[][][]>;
      open_file_dialog: () => Promise<number[][][]>;
      test: () => void;
    };
    state: any;
  };
}
