import React from "react";
import "../styles/frame.css";

const HeaderFrame = ({ children }: { children?: React.ReactNode }) => {
  return <div className="util-header">{children}</div>;
};

export default HeaderFrame;
