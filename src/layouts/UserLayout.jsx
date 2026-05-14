import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex h-screen">


      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOP NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default UserLayout;