import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  Users,
  Truck,
  LogOut,
} from "lucide-react";
import { logoutUser } from "../services/authServices";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logoutUser(); // axios instance

      localStorage.clear(); // optional
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between min-h-screen">

      {/* TOP */}
      <div>
        <h1 className="text-2xl font-bold mb-8">🚗 Admin Panel</h1>

        <div className="space-y-3">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink
            to="/admin/cars"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <Car size={18} /> Cars
          </NavLink>

          <NavLink
            to="/admin/bookings"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <CalendarCheck size={18} /> Bookings
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <Users size={18} /> Users
          </NavLink>

          <NavLink
            to="/admin/drivers"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <Truck size={18} /> Drivers
          </NavLink>

        </div>
      </div>

      {/* BOTTOM */}
      <button
        onClick={logout}
        className="flex items-center gap-2 text-red-500 hover:text-red-400"
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
  );
};

export default Sidebar;