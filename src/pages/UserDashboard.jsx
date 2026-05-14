import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Car,
  Calendar,
  LayoutDashboard,
  User,
  LogOut,
  Wallet,
} from "lucide-react";
import creta from "../assets/creta.png";
import swift from "../assets/carImage.jpg";
import city from "../assets/CITY-CARS.jpg";
import seltos from "../assets/seltos.png";
import hyundai from '../assets/hyundai.jpg'
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cars = [
    { name: "Creta", image: creta, price: "₹2000/day" },
    { name: "Swift", image: swift, price: "₹1500/day" },
    { name: "City", image: city, price: "₹2200/day" },
    { name: "Seltos", image: seltos, price: "₹2500/day" },
  ];

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOP NAVBAR */}
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">User Dashboard</h2>

          <div className="flex items-center gap-4">
            {/* Wallet */}
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
              <Wallet size={18} className="text-green-600" />
              <span className="text-sm font-medium">₹24,560</span>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-lg">
              <img
                src={
                  user?.profileImage ||
                  `https://ui-avatars.com/api/?name=${user?.name || "User"}`
                }
                className="w-8 h-8 rounded-full"
                alt="profile"
              />
              <div className="text-sm">
                <p className="font-medium">{user?.name}</p>
                <p className="text-gray-500 text-xs">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              Welcome back, {user?.name} 👋
            </h2>
            <p className="text-gray-500 text-sm">
              Here’s your activity overview
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">Total Bookings</p>
              <h2 className="text-xl font-bold mt-2">12</h2>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">Upcoming Trips</p>
              <h2 className="text-xl font-bold mt-2">3</h2>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">Total Spent</p>
              <h2 className="text-xl font-bold mt-2 text-green-600">₹24,560</h2>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">Account Type</p>
              <h2 className="text-xl font-bold mt-2 capitalize">
                {user?.role}
              </h2>
            </div>
          </div>

          {/* UPCOMING + RECENT */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* UPCOMING */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-4">Upcoming Booking</h3>

              <div className="flex items-center gap-4">
                <img
                  src={creta}
                  className="w-32 rounded-lg"
                />
                <div>
                  <h4 className="font-semibold">Hyundai Creta</h4>
                  <p className="text-sm text-gray-500">25 May - 28 May</p>
                  <span className="text-green-600 text-sm">Confirmed</span>
                </div>
              </div>

              <button className="mt-4 w-full border border-blue-600 text-blue-600 py-2 rounded-lg">
                View Booking Details
              </button>
            </div>

            {/* RECENT */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-4">Recent Bookings</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={hyundai}
                      className="w-16 h-12 rounded object-cover"
                    />
                    <span>Hyundai i20</span>
                  </div>
                  <span className="text-green-600">Confirmed</span>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={swift}
                      className="w-16 h-12 rounded object-cover"
                    />
                    <span>Swift Dzire</span>
                  </div>
                  <span className="text-yellow-600">Pending</span>
                </div>
              </div>
            </div>
          </div>

          {/* POPULAR + OFFER */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* POPULAR */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-4">Popular Cars</h3>

              <div className="grid grid-cols-2 gap-4">
                {cars.map((car, i) => (
                  <div key={i} className="border rounded-lg p-3 text-center">
                    <img
                      src={car.image}
                      className="w-full h-32 object-contain rounded mb-2 bg-gray-50"
                    />
                    <p>{car.name}</p>
                    <p className="text-sm text-gray-500">{car.pricePerDay}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* OFFER */}
            <div className="bg-blue-600 text-white p-6 rounded-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold">Get 20% OFF</h3>
                <p className="text-sm">On your next booking</p>
              </div>

              <img
                src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
                className="rounded-lg my-4"
              />

              <button
                onClick={() => navigate("/cars")}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
