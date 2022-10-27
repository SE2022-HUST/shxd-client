import React from "react";
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <div>
      Root
      <div>
        <Link to={"test"}>Test</Link>
      </div>
    </div>
  );
}
