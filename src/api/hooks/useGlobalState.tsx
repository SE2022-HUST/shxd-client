import { useEffect, useCallback } from "react";

let available = false;

export function setPyAvailable(val: boolean) {
  available = true;
}

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

// 这个hook用于注册pywebview可以调用的state
export default function useGlobalState(...toAppend: StateUnit[]) {
  const memo = useCallback(() => {
    if (window.pywebview === undefined) return;
    // eslint-disable-next-line no-unmodified-loop-condition
    if (window.pywebview.state === undefined) {
      window.pywebview.state = {};
    }
    for (const item of toAppend) {
      appendState(item.name, item.data);
    }
    console.log("registered:", window.pywebview.state);
  }, []);
  useEffect(() => {
    memo();
  }, [memo]);
}
