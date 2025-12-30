import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
const Adminlayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className=" p-6">
      <Outlet />
    </div>
    </div>
  );
};
export default Adminlayout;
