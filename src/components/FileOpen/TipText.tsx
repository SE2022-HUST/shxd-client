import React, { FC, PropsWithChildren } from "react";

const TipText: FC<PropsWithChildren> = ({ children }) => {
  return <div className="tip-text">{children}</div>;
};

export default TipText;
