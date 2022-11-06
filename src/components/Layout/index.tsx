import React, { useState } from "react";
import MenuButton from "./MenuButton";
import DrawerMenu from "./DrawerMenu";
import { Outlet, useLocation } from "react-router-dom";
import "./style.css";
import { menuBlackList } from "../../api/constants";

const Layout = (props: { children?: React.ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const stateChanger = (s: boolean) => {
    setDrawerOpen(s);
  };
  const loc = useLocation();
  const checkBlackList: () => boolean = () => {
    for (const item of menuBlackList) {
      if (loc.pathname === item) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="layout-container">
      {!checkBlackList() ? (
        <>
          <MenuButton setOpen={stateChanger} />
          <DrawerMenu open={drawerOpen} setOpen={stateChanger} />
        </>
      ) : (
        <></>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
