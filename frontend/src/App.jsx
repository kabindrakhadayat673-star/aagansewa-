import React from "react";
import { router } from "./router/Index";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}
