import React from "react";
import { Outlet } from "react-router-dom";

const Adminlayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Adminlayout;
