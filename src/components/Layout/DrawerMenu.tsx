import React from "react";
import Drawer from "@mui/material/Drawer";
import MenuList from "./MenuList";

interface IProp {
  open: boolean;
  setOpen: (state: boolean) => void;
}

const DrawerMenu = ({ open, setOpen }: IProp) => {
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };
  return (
    <div className="drawer-menu">
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <MenuList
          closeHandler={() => {
            setOpen(false);
          }}
        />
      </Drawer>
    </div>
  );
};

export default DrawerMenu;
