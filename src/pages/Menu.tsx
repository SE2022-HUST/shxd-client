import React from "react";
import { entries } from "../api/constants";
import MenuItem from "../components/MenuItem";
import "../styles/menu.css";

const Menu = () => {
  return (
    <div className="menu-page">
      <h1>Auto Mosaic Client@SHXD</h1>
      <div className="menu-container">
        {entries.map((entry, index) => {
          if (entry.name === "主页") {
            return <React.Fragment key={index}></React.Fragment>;
          }
          return <MenuItem key={index} data={entry} />;
        })}
        <video autoPlay loop className="bg-video">
          <source src="http://cdn.moji.com/websrc/video/video621.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Menu;
