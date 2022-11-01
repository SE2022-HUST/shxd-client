import React, { useState } from "react";
import MenuButton from "./MenuButton";

import DrawerMenu from "./DrawerMenu";
import { Outlet } from "react-router-dom";

const Layout = (props: { children?: React.ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const stateChanger = (s: boolean) => {
    setDrawerOpen(s);
  };
  return (
    <div>
      <MenuButton setOpen={stateChanger} />
      <DrawerMenu open={drawerOpen} setOpen={stateChanger} />
      <div>{props.children}</div>
      <Outlet />
    </div>
  );
};

export default Layout;
