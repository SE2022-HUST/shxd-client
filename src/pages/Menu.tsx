import React from "react";
import { entries } from "../api/constants";
import MenuItem from "../components/MenuItem";
import "../styles/menu.css";

const Menu = () => {
  return (
    <div className="menu-page">
      <h1>功能</h1>
      <div className="menu-container">
        {entries.map((entry, index) => {
          if (entry.name === "主页") {
            return <React.Fragment key={index}></React.Fragment>;
          }
          return <MenuItem key={index} data={entry} />;
        })}
      </div>
    </div>
  );
};

export default Menu;
