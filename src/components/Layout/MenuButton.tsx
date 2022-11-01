import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import cn from "classnames";

const MenuButton = (props: { setOpen: (state: boolean) => void }) => {
  const clickHandler = () => {
    props.setOpen(true);
  };
  return (
    <div className={cn("layout-headbar", "menu-button")}>
      <IconButton aria-label="menu" onClick={clickHandler}>
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
    </div>
  );
};

export default MenuButton;
