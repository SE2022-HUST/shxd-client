import React from "react";
import { useNavigate } from "react-router-dom";
import { EntryNode } from "../../api/constants";
import ImageButton from "./ImageButton";

interface IProp {
  data: EntryNode;
}

const MenuItem = ({ data: entry }: IProp) => {
  const nav = useNavigate();
  const clickHandler = () => {
    nav(entry.url);
  };
  return (
    <div className="img-button-elmt">
      <ImageButton src={entry.pic} name={entry.name} onClick={clickHandler} />
    </div>
  );
};

export default MenuItem;
