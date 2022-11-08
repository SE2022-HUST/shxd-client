import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./api/redux/store";
import { MODE } from "./api/types/types";
import Layout from "./components/Layout";
import Compress from "./pages/Compress";
import Error from "./pages/Error";
import ImageCase from "./pages/ImageCase";
import Menu from "./pages/Menu";
import Mosaic from "./pages/Mosaic";
import Progress from "./pages/Progress";
import Stylish from "./pages/Stylish";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout mode={MODE.WHITE_LIST} />,
    errorElement: <Error />,
    children: [
      {
        path: "*",
        element: <Menu />,
      },
      {
        index: true,
        element: <Menu />,
      },
      {
        path: "compress",
        element: <Compress />,
      },
      {
        path: "stylish",
        element: <Stylish />,
      },
      {
        path: "mosaic",
        element: <Mosaic />,
      },
      {
        path: "images",
        element: <ImageCase />,
      },
      {
        path: "progress",
        element: <Progress />,
      },
    ],
  },
]);

export default function App() {
  useEffect(() => {
    document.oncontextmenu = () => false; // 屏蔽右键菜单
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
}
