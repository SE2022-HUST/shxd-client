import { useEffect } from "react";

// 这个hook用于注册pywebview可以调用的state

export function appendState(name: string, data: any) {
  if (window.pywebview.state === undefined) {
    throw new Error("未初始化全局State");
  }
  window.pywebview.state[name] = data;
}

export interface StateUnit {
  name: string;
  data: any;
}

export default function useGlobalState(...toAppend: StateUnit[]) {
  useEffect(() => {
    if (window.pywebview.state === undefined) {
      window.pywebview.state = {};
    }
    for (const item of toAppend) {
      appendState(item.name, item.data);
    }
  });
}
