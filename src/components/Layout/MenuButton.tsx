import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

const MenuButton = (props: { setOpen: (state: boolean) => void }) => {
  const clickHandler = () => {
    props.setOpen(true);
  };
  return (
    <div>
      <IconButton aria-label="menu" onClick={clickHandler}>
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
    </div>
  );
};

export default MenuButton;
