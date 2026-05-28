import React, { useEffect, useState } from "react";
import instance from "../../instances/instance";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState({});

  // ================= FETCH BOOKINGS =================
  const fetchBookings = async () => {
    try {
      const res = await instance.get("/admin/bookings", {
        withCredentials: true,
      });

      const data = res.data.bookings || res.data || [];
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Booking fetch error:", err);
      setBookings([]);
    }
  };

  // ================= FETCH DRIVERS =================
  const fetchDrivers = async () => {
    try {
      const res = await instance.get("/drivers");

      const data = res.data?.drivers || res.data || [];
      setDrivers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Driver fetch error:", err);
      setDrivers([]);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchDrivers();
  }, []);

  // ================= APPROVE =================
  const handleApprove = async (id) => {
    try {
      await instance.put(`/admin/${id}/approve`);
      fetchBookings();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= REJECT =================
  const handleReject = async (id) => {
    try {
      await instance.put(`/admin/${id}/reject`);
      fetchBookings();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= CANCEL =================
  const handleCancel = async (id) => {
    try {
      await instance.put(`/${id}/cancel`);
      fetchBookings();
      fetchDrivers();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= MANUAL ASSIGN =================
  const handleAssign = async (bookingId) => {
    try {
      const driverId = selectedDriver[bookingId];

      if (!driverId) return alert("Select driver");

      await instance.post(`/assign-driver/${bookingId}`, {
        driverId,
      });

      alert("Driver assigned");

      fetchBookings();
      fetchDrivers();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= AUTO ASSIGN =================
  const handleAutoAssign = async (bookingId) => {
    try {
      await instance.post(`/auto-assign/${bookingId}`);
      alert("Driver auto assigned");

      fetchBookings();
      fetchDrivers();
    } catch (err) {
      console.log(err);
      alert("No available drivers");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📦 Admin Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="bg-white p-4 rounded-xl shadow">

              {/* ================= DETAILS ================= */}
              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <p>
                    <b>User:</b>{" "}
                    {b.userId?.name || "N/A"} ({b.userId?.email || ""})
                  </p>

                  <p>
                    <b>Car:</b>{" "}
                    {b.carId?.name || "Not assigned"}
                  </p>

                  <p>
                    <b>Price:</b> ₹{b.totalPrice || 0}
                  </p>

                  <p>
                    <b>Status:</b>{" "}
                    <span
                      className={`ml-2 px-2 py-1 rounded text-white text-sm ${
                        b.status === "confirmed"
                          ? "bg-green-500"
                          : b.status === "pending"
                          ? "bg-yellow-500"
                          : b.status === "cancelled"
                          ? "bg-gray-500"
                          : "bg-red-500"
                      }`}
                    >
                      {b.status}
                    </span>
                  </p>
                </div>

                <div>
                  <p><b>Pickup:</b> {b.pickupLocation || "-"}</p>
                  <p><b>Drop:</b> {b.dropLocation || "-"}</p>
                  <p>
                    <b>Dates:</b>{" "}
                    {b.startDate?.slice(0, 10)} → {b.endDate?.slice(0, 10)}
                  </p>

                  <p>
                    <b>Driver:</b>{" "}
                    {b.driverId?.name || "Not assigned"}
                  </p>
                </div>

              </div>

              {/* ================= ACTIONS ================= */}
              <div className="mt-4 flex flex-wrap gap-2">

                {b.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(b._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(b._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}

                {b.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancel(b._id)}
                    className="bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                )}

                {/* AUTO ASSIGN */}
                <button
                  onClick={() => handleAutoAssign(b._id)}
                  className="bg-purple-600 text-white px-3 py-1 rounded"
                  disabled={b.status !== "confirmed" || b.driverId}
                >
                  Auto Assign
                </button>

              </div>

              {/* ================= MANUAL ASSIGN ================= */}
              <div className="mt-4 flex gap-2 items-center">

                <select
                  disabled={b.status !== "confirmed" || b.driverId}
                  value={selectedDriver[b._id] || ""}
                  onChange={(e) =>
                    setSelectedDriver({
                      ...selectedDriver,
                      [b._id]: e.target.value,
                    })
                  }
                  className="border p-2 rounded"
                >
                  <option value="">Select Driver</option>

                  {drivers
                    .filter((d) => d.status === "Available")
                    .map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.name}
                      </option>
                    ))}
                </select>

                <button
                  onClick={() => handleAssign(b._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  disabled={
                    b.status !== "confirmed" ||
                    !selectedDriver[b._id] ||
                    b.driverId
                  }
                >
                  Assign Driver
                </button>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;