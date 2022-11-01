/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from "react";
import { Link, useRouteError } from "react-router-dom";
import "../styles/error.css";

const Error = () => {
  const err: any = useRouteError();
  console.log(err);
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Something goes wrong when navigating with react-router...</p>
      <p>
        <i>{err.statusText || err.message}</i>
      </p>
      <Link to="/">Back to index page</Link>
    </div>
  );
};

export default Error;
