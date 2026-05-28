import React, { useEffect, useState } from "react";
import instance from "../../instances/instance";
import Cars from "./Cars";

const AdminDashboard = () => {
  const [tab, setTab] = useState("dashboard");

  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);

  // ================= FETCH ALL DATA =================
  const fetchCars = async () => {
    try {
      const res = await instance.get("/cars");
      setCars(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await instance.get("/admin/bookings");
      setBookings(res.data?.bookings || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await instance.get("/admin/users");
      setUsers(res.data?.users || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDrivers = async () => {
    try {
      const res = await instance.get("/drivers");
      setDrivers(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchBookings();
    fetchUsers();
    fetchDrivers();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 overflow-auto">

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Dashboard Overview
            </h2>

            <div className="grid grid-cols-4 gap-4">

              <div className="bg-white p-4 rounded shadow">
                🚗 Cars: {cars.length}
              </div>

              <div className="bg-white p-4 rounded shadow">
                📦 Bookings: {bookings.length}
              </div>

              <div className="bg-white p-4 rounded shadow">
                👤 Users: {users.length}
              </div>

              <div className="bg-white p-4 rounded shadow">
                🚕 Drivers: {drivers.length}
              </div>

            </div>
          </div>
        )}

        {/* CARS */}
        {tab === "cars" && <Cars />}

        {/* BOOKINGS */}
        {tab === "bookings" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Bookings</h2>

            <div className="bg-white p-4 rounded shadow space-y-3">
              {bookings.length === 0 ? (
                <p>No bookings found</p>
              ) : (
                bookings.map((b) => (
                  <div
                    key={b._id}
                    className="flex justify-between border-b pb-2"
                  >
                    <p>
                      {b.userId?.name} - {b.carId?.name}
                    </p>

                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        b.status === "confirmed"
                          ? "bg-green-500"
                          : b.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* USERS */}
        {tab === "users" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Users List</h2>

            <div className="bg-white p-4 rounded shadow">
              {users.length === 0 ? (
                <p>No users found</p>
              ) : (
                users.map((u) => (
                  <div key={u._id} className="border-b py-2">
                    <p>{u.name}</p>
                    <p className="text-sm text-gray-500">{u.email}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* DRIVERS */}
        {tab === "drivers" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Drivers List</h2>

            <div className="bg-white p-4 rounded shadow">
              {drivers.length === 0 ? (
                <p>No drivers found</p>
              ) : (
                drivers.map((d) => (
                  <div key={d._id} className="border-b py-2">
                    <p className="font-semibold">{d.name}</p>
                    <p className="text-sm text-gray-500">
                      License: {d.license}
                    </p>
                    <p className="text-sm">
                      Status: {d.status}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;