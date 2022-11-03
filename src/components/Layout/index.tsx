import React, { useEffect, useState } from "react";
import MenuButton from "./MenuButton";
import DrawerMenu from "./DrawerMenu";
import { Outlet, useLocation } from "react-router-dom";
import "./style.css";

const Layout = (props: { children?: React.ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const stateChanger = (s: boolean) => {
    setDrawerOpen(s);
  };
  const loc = useLocation();
  useEffect(() => {
    console.log(loc.pathname);
  }, [loc]);

  return (
    <div className="layout-container">
      {loc.pathname !== "/" ? (
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
