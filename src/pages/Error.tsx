/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from "react";
import { Link, useRouteError } from "react-router-dom";
import "../styles/error.css";

const Error = () => {
  const err: any = useRouteError();
  console.log(err);
  return (
    <div className="error-page">
      <h1>出错了！</h1>
      <p>你进入了未知的荒原...</p>
      <p>
        <i>{`${err.statusText as string}: ${err.message as string}`}</i>
      </p>
      <Link to="/">返回主页</Link>
    </div>
  );
};

export default Error;
