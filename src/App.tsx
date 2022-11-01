import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Compress from "./pages/Compress";
import Error from "./pages/Error";
import Menu from "./pages/Menu";
import Mosaic from "./pages/Mosaic";
import Stylish from "./pages/Stylish";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        element: <Menu />,
        index: true,
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
    ],
  },
]);

export default function App() {
  useEffect(() => {
    document.oncontextmenu = () => false; // 屏蔽右键菜单
    return () => {};
  });

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
