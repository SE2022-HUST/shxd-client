export interface FrameData {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

export enum MODE {
  WHITE_LIST,
  BLACK_LIST,
}
