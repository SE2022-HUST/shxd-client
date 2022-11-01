import React from "react";
import { Box, List } from "@mui/material";
import MyListItem from "./ListItem";
import { entries } from "../../api/constants";
import { useNavigate } from "react-router-dom";

const MenuList = ({ closeHandler }: { closeHandler: () => void }) => {
  const nav = useNavigate();
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <MyListItem
          key="home"
          content="主页"
          onClick={() => {
            closeHandler();
            nav("/");
          }}
        />
        {entries.map((entry) => {
          const clickHandler = () => {
            closeHandler();
            nav(entry.url);
          };
          return (
            <MyListItem
              key={entry.name}
              content={entry.name}
              onClick={clickHandler}
            />
          );
        })}
      </List>
    </Box>
  );
};

export default MenuList;
