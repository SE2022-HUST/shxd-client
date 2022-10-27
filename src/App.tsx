import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Root from "./pages/Root";
import Test from "./pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
