import React from "react";
import { Box, List } from "@mui/material";
import MyListItem from "./ListItem";
import { entries } from "../../api/constants";
import { useNavigate } from "react-router-dom";

const MenuList = () => {
  const nav = useNavigate();
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {entries.map((entry) => {
          const clickHandler = () => {
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
