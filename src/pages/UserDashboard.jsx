import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";

import creta from "../assets/creta.png";
import swift from "../assets/carImage.jpg";
import city from "../assets/CITY-CARS.jpg";
import seltos from "../assets/seltos.png";

import instance from "../instances/instance";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // BOOKINGS STATE
  const [bookings, setBookings] = useState([]);

  // POPULAR CARS
  const cars = [
    { name: "Creta", image: creta, price: "₹2000/day" },
    { name: "Swift", image: swift, price: "₹1500/day" },
    { name: "City", image: city, price: "₹2200/day" },
    { name: "Seltos", image: seltos, price: "₹2500/day" },
  ];

  // FETCH BOOKINGS
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await instance.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  // DYNAMIC DATA
  const totalBookings = bookings.length;

  const upcomingTrips = bookings.filter(
    (b) => b.status === "confirmed"
  ).length;

  const totalSpent = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((total, b) => {
      return total + (b.totalPrice || 0);
    }, 0);

  const recentBookings = bookings.slice(0, 3);

  const upcomingBooking = bookings.find(
    (b) => b.status === "confirmed"
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP NAVBAR */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

        <h2 className="text-xl font-bold">
          User Dashboard
        </h2>

        <div className="flex items-center gap-4">

          {/* WALLET */}
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">

            <Wallet
              size={18}
              className="text-green-600"
            />

            <span className="font-semibold text-sm">
              ₹{totalSpent}
            </span>

          </div>

          {/* PROFILE */}
          <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl">

            <img
              src={
                user?.profileImage ||
                `https://ui-avatars.com/api/?name=${
                  user?.name || "User"
                }`
              }
              className="w-10 h-10 rounded-full object-cover"
              alt="profile"
            />

            <div>
              <p className="font-medium text-sm">
                {user?.name}
              </p>

              <p className="text-xs text-gray-500">
                {user?.email}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* HEADER */}
        <div className="mb-6">

          <h2 className="text-3xl font-bold">
            Welcome back, {user?.name} 👋
          </h2>

          <p className="text-gray-500 mt-1">
            Here’s your activity overview
          </p>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          {/* TOTAL BOOKINGS */}
          <div className="bg-white p-5 rounded-2xl shadow">

            <p className="text-sm text-gray-500">
              Total Bookings
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {totalBookings}
            </h2>

          </div>

          {/* UPCOMING */}
          <div className="bg-white p-5 rounded-2xl shadow">

            <p className="text-sm text-gray-500">
              Upcoming Trips
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {upcomingTrips}
            </h2>

          </div>

          {/* TOTAL SPENT */}
          <div className="bg-white p-5 rounded-2xl shadow">

            <p className="text-sm text-gray-500">
              Total Spent
            </p>

            <h2 className="text-2xl font-bold mt-2 text-green-600">
              ₹{totalSpent}
            </h2>

          </div>

          {/* ACCOUNT TYPE */}
          <div className="bg-white p-5 rounded-2xl shadow">

            <p className="text-sm text-gray-500">
              Account Type
            </p>

            <h2 className="text-2xl font-bold mt-2 capitalize">
              {user?.role}
            </h2>

          </div>

        </div>

        {/* UPCOMING + RECENT */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* UPCOMING BOOKING */}
          <div className="bg-white p-5 rounded-2xl shadow">

            <h3 className="font-semibold text-lg mb-4">
              Upcoming Booking
            </h3>

            {upcomingBooking ? (

              <>
                <div className="flex items-center gap-4">

                  <img
                    src={upcomingBooking.carId?.image}
                    className="w-36 h-24 rounded-lg object-cover"
                  />

                  <div>

                    <h4 className="font-semibold text-lg">
                      {upcomingBooking.carId?.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {new Date(
                        upcomingBooking.startDate
                      ).toLocaleDateString()}
                      {" - "}
                      {new Date(
                        upcomingBooking.endDate
                      ).toLocaleDateString()}
                    </p>

                    <span className="text-green-600 text-sm font-medium">
                      Confirmed
                    </span>

                  </div>

                </div>

                <button
                  onClick={() =>
                    navigate("/my-bookings")
                  }
                  className="mt-5 w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 rounded-lg transition"
                >
                  View Booking Details
                </button>
              </>

            ) : (

              <div className="text-center py-10">

                <p className="text-gray-500 mb-4">
                  No upcoming bookings 🚗
                </p>

                <button
                  onClick={() =>
                    navigate("/cars")
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Browse Cars
                </button>

              </div>

            )}

          </div>

          {/* RECENT BOOKINGS */}
          <div className="bg-white p-5 rounded-2xl shadow">

            <h3 className="font-semibold text-lg mb-4">
              Recent Bookings
            </h3>

            <div className="space-y-4">

              {recentBookings.length > 0 ? (

                recentBookings.map((booking) => (

                  <div
                    key={booking._id}
                    className="flex items-center justify-between border-b pb-3"
                  >

                    <div className="flex items-center gap-3">

                      <img
                        src={booking.carId?.image}
                        className="w-16 h-12 rounded object-cover"
                      />

                      <div>

                        <p className="font-medium">
                          {booking.carId?.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {new Date(
                            booking.startDate
                          ).toLocaleDateString()}
                        </p>

                      </div>

                    </div>

                    <span
                      className={`text-sm font-medium ${
                        booking.status === "confirmed"
                          ? "text-green-600"
                          : booking.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {booking.status}
                    </span>

                  </div>

                ))

              ) : (

                <div className="text-center py-10">

                  <p className="text-gray-500">
                    No recent bookings
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* POPULAR + OFFER */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* POPULAR CARS */}
          <div className="bg-white p-5 rounded-2xl shadow">

            <h3 className="font-semibold text-lg mb-4">
              Popular Cars
            </h3>

            <div className="grid grid-cols-2 gap-4">

              {cars.map((car, i) => (
                <div
                  key={i}
                  className="border rounded-xl p-3 text-center hover:shadow-lg transition"
                >

                  <img
                    src={car.image}
                    className="w-full h-32 object-contain rounded mb-2 bg-gray-50"
                  />

                  <p className="font-medium">
                    {car.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {car.price}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* OFFER */}
          <div className="bg-blue-600 text-white p-6 rounded-2xl flex flex-col justify-between">

            <div>

              <h3 className="text-3xl font-bold">
                Get 20% OFF 🎉
              </h3>

              <p className="text-sm mt-2">
                On your next booking
              </p>

            </div>

            <img
              src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
              className="rounded-xl my-5 h-52 object-cover"
            />

            <button
              onClick={() => navigate("/cars")}
              className="bg-white text-blue-600 font-semibold px-5 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Book Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserDashboard;