import React, { FC } from "react";
import { ImageListItemBar, IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

interface IProps {
  onClick: () => void;
  chosen: boolean;
}

const ImageBar: FC<IProps> = ({ onClick, chosen }) => {
  return (
    <ImageListItemBar
      className="image-item-bar"
      position="top"
      actionIcon={
        <IconButton sx={{ color: "white" }} onClick={onClick}>
          {chosen ? (
            <StarIcon fontSize="large" />
          ) : (
            <StarBorderIcon fontSize="large" />
          )}
        </IconButton>
      }
      actionPosition="left"
      sx={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
          "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
      }}
    />
  );
};

export default ImageBar;
