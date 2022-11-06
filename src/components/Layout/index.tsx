import React, { FC, PropsWithChildren, useState } from "react";
import MenuButton from "./MenuButton";
import DrawerMenu from "./DrawerMenu";
import { Outlet, useLocation } from "react-router-dom";
import "./style.css";
import { menuBlackList, menuWhiteList } from "../../api/constants";
import { MODE } from "../../api/types/types";

const Layout: FC<{ mode: MODE }> = ({ mode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const stateChanger = (s: boolean) => {
    setDrawerOpen(s);
  };
  const loc = useLocation();
  const checkDisplay = () => {
    if (mode === MODE.BLACK_LIST) {
      for (const item of menuBlackList) {
        if (loc.pathname === item) {
          return false;
        }
      }
      return true;
    } else {
      for (const item of menuWhiteList) {
        if (loc.pathname === item) {
          return true;
        }
      }
      return false;
    }
  };

  return (
    <div className="layout-container">
      {checkDisplay() ? (
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
