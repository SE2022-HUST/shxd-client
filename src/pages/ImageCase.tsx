import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/image.css";
import MyImageList from "../components/ImageList";
import HeaderFrame from "../components/HeaderFrame";
import { Button } from "@mui/material";
import { useAppSelector } from "../api/redux/store";
import { selectImageReady } from "../api/redux/ImageSlice";

const ImageCase = () => {
  const nav = useNavigate();
  const ready = useAppSelector(selectImageReady);

  const init = new Array<boolean>(itemData.length);
  for (let i = 0; i < init.length; i++) {
    init[i] = false;
  }
  const [chosenList, setChoseList] = useState<boolean[]>(init);
  const setChosen = (index: number) => {
    const copy = chosenList.slice();
    copy[index] = !copy[index];
    setChoseList(copy);
    console.log(chosenList);
  };
  const backHandler = () => {
    nav(-1);
  };
  const nextHandler = () => {
    window.pywebview.api.send_chosen_entities(chosenList);
    nav("/progress");
  };
  return (
    <div className="image-show-case">
      <HeaderFrame>
        <h2>请点选你需要隐藏的对象</h2>
        <div className="header-controls">
          <Button variant="contained" className="but" onClick={backHandler}>
            返回
          </Button>
          <Button variant="contained" className="but" onClick={nextHandler}>
            下一步
          </Button>
        </div>
      </HeaderFrame>
      <div className="image-show-main">
        <MyImageList
          data={itemData}
          setChosen={setChosen}
          chosen={chosenList}
          ready={ready}
        />
      </div>
    </div>
  );
};

export default ImageCase;

const itemData: Array<{
  img: string;
  title?: string;
  author?: string;
}> = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
  },
];
