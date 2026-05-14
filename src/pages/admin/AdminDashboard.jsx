import React, { useState } from "react";
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  Users,
  Truck,
  PlusCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Cars from './Cars'

const AdminDashboard = () => {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
     
      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 overflow-auto">

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-4 gap-4">

              <div className="bg-white p-4 rounded shadow">🚗 Cars: 12</div>
              <div className="bg-white p-4 rounded shadow">📦 Bookings: 30</div>
              <div className="bg-white p-4 rounded shadow">👤 Users: 50</div>
              <div className="bg-white p-4 rounded shadow">🚕 Drivers: 8</div>

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

              <div className="flex justify-between border-b pb-2">
                <p>John - Creta</p>
                <div className="space-x-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded">Confirm</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                </div>
              </div>

              <div className="flex justify-between">
                <p>Sarah - Swift</p>
                <span className="text-yellow-600">Pending</span>
              </div>

            </div>
          </div>
        )}

        {/* USERS */}
        {tab === "users" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Users List</h2>

            <div className="bg-white p-4 rounded shadow">
              <p>User table (name, email, bookings count)</p>
            </div>
          </div>
        )}

        {/* DRIVERS */}
        {tab === "drivers" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Drivers List</h2>

            <div className="bg-white p-4 rounded shadow">
              <p>Driver table (name, license, assigned bookings)</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;