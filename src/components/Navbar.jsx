import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Car } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <div className="flex gap-2 text-2xl font-bold">
        <Car />
        CarBook
      </div>

      {/* MENU */}
      <div className="flex gap-6 items-center">

        <Link to="/">Home</Link>

        {/* AFTER LOGIN */}
        {user ? (
          <>
            <Link to="/cars">Cars</Link>
            <Link to="/bookings">My Bookings</Link>
            <Link to='/offers'>Offers</Link>

            <span className="text-sm text-gray-500">
              Hi, {user.name}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* BEFORE LOGIN */}
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;