/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ImageState {
  value: RawImage[][] | undefined;
  ready: boolean;
  mark: boolean[][] | undefined;
}

const initialState: ImageState = {
  value: undefined,
  ready: false,
  mark: undefined,
};

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<RawImage[][]>) => {
      state.value = action.payload;
    },
    setReady: (state) => {
      state.ready = true;
    },
    setMark: (state, action: PayloadAction<boolean[][]>) => {
      state.mark = action.payload;
    },
    setMarkByPage: (
      state,
      action: PayloadAction<{ page: number; index: number }>
    ) => {
      const { page, index } = action.payload;
      if (state.mark !== undefined) {
        state.mark[page][index] = !state.mark[page][index];
      }
    },
  },
});

export const { setImages, setReady, setMark, setMarkByPage } =
  imageSlice.actions;
export const selectImage = (state: RootState) => state.images.value;
export const selectImageReady = (state: RootState) => state.images.ready;
export const selectMark = (state: RootState) => state.images.mark;

export default imageSlice.reducer;
