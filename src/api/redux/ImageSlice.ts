/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ImageState {
  value: any;
  ready: boolean;
}

const initialState: ImageState = {
  value: undefined,
  ready: false,
};

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
    setReady: (state) => {
      state.ready = true;
    },
  },
});

export const { setImages, setReady } = imageSlice.actions;
export const selectImage = (state: RootState) => state.images.value;
export const selectImageReady = (state: RootState) => state.images.ready;

export default imageSlice.reducer;
