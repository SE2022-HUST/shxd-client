import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// 为了给App里的window对象提供pywebview属性，必须将'pywebview'传入函数参数
// 直接调用App传参会导致React组件初始化（因为函数组件参数不对于是Hook报错）出问题
// 所以单独列一个包装组件来包裹App组件
const Wrapper = function (para: any) {
  return (
    <>
      <App />
    </>
  );
};
// 初始化pywebview属性
const WrapperInstance = Wrapper("pywebview");

const root = document.getElementById("root");
ReactDOM.render(WrapperInstance, root);
