import React, { useEffect, useState } from "react";
import instance from "../instances/instance";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  useEffect(() => {
    if (userId) fetchBookings();
  }, [userId]);

  //  GET BOOKINGS
  const fetchBookings = async () => {
    try {
      const res = await instance.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // CANCEL
  const cancelBooking = async (id) => {
    try {
      await instance.put(`/bookings/${id}/cancel`);
      fetchBookings();
    } catch (err) {
      console.log(err);
    }
  };

  // 🗑 DELETE
  const deleteBooking = async (id) => {
    try {
      const res = await instance.delete(`/bookings/${id}`);

      console.log("DELETE RESPONSE:", res.data);

      fetchBookings();
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data);
    }
  };

  // 💳 RAZORPAY PAYMENT
  const handlePayment = async (booking) => {
    try {
      const days =
        Math.ceil(
          (new Date(booking.endDate) - new Date(booking.startDate)) /
            (1000 * 60 * 60 * 24),
        ) || 1;

      const pricePerDay = booking.carId?.pricePerDay || 0;
      const basePrice = days * pricePerDay;
      let taxPercentage = 18;

      let discount = 0;

      if (basePrice >= 5000) {
        discount = 1000;
      } else if (basePrice >= 3000) {
        discount = 500;
      } else if (basePrice >= 1500) {
        discount = 200;
      }

      const tax = Math.round((basePrice * taxPercentage) / 100);

      const finalTotal = basePrice + tax - discount;

      const amountInPaise = finalTotal * 100;

      const { data } = await instance.post("/payment/create-order", {
        bookingId: booking._id,
        amount: amountInPaise,
      });

      // 2️⃣ razorpay options
      const options = {
        key: "rzp_test_SoRIxgcnV809XD",
        amount: data.amount,
        currency: "INR",
        name: "Car Rental System",
        order_id: data.id,

        handler: async function (response) {
          await instance.post("/payment/verify", {
            ...response,
            bookingId: booking._id,
          });

          alert("Payment Successful");
          fetchBookings();
        },

        prefill: {
          name: user?.name || "User",
          email: user?.email || "user@email.com",
          contact: "9999999999",
        },

        theme: {
          color: "#2563eb",
        },
        config: {
          display: {
            blocks: {
              cards: {
                name: "Pay with Card",
                instruments: [
                  {
                    method: "card",
                  },
                ],
              },
              netbanking: {
                name: "Net Banking",
                instruments: [
                  {
                    method: "netbanking",
                  },
                ],
              },
              wallet: {
                name: "Wallet",
                instruments: [
                  {
                    method: "wallet",
                  },
                ],
              },
              upi: {
                name: "UPI",
                instruments: [
                  {
                    method: "upi",
                  },
                ],
              },
            },
            sequence: [
              "block.cards",
              "block.upi",
              "block.netbanking",
              "block.wallet",
            ],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 SORT
  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const pending = sortedBookings.filter((b) => b.status === "pending");
  const confirmed = sortedBookings.filter((b) => b.status === "confirmed");
  const cancelled = sortedBookings.filter((b) => b.status === "cancelled");

  // ⭐ RENDER CARD
  const renderCard = (b, isCancelled = false) => {
    const days =
      Math.ceil(
        (new Date(b.endDate) - new Date(b.startDate)) / (1000 * 60 * 60 * 24),
      ) || 1;

    const pricePerDay = b.carId?.pricePerDay || 0;
    const basePrice = days * pricePerDay;
    // GST / TAX (government based)
    let taxPercentage = 18;

    // DISCOUNT BASED ON AMOUNT
    let discount = 0;

    if (basePrice >= 5000) {
      discount = 1000;
    } else if (basePrice >= 3000) {
      discount = 500;
    } else if (basePrice >= 1500) {
      discount = 200;
    }

    // TAX CALCULATION
    const tax = Math.round((basePrice * taxPercentage) / 100);

    // FINAL TOTAL
    const finalTotal = basePrice + tax - discount;

    return (
      <div
        key={b._id}
        className={`bg-white rounded-xl shadow p-5 ${
          isCancelled ? "opacity-60 grayscale" : ""
        }`}
      >
        {/* CAR */}
        <div className="flex gap-4">
          <img
            src={b.carId?.image}
            className="w-48 h-32 object-cover rounded-lg"
          />

          <div>
            <h3 className="text-xl font-bold">{b.carId?.name}</h3>
            <p className="text-gray-500">{b.carId?.brand}</p>

            <div className="flex gap-4 text-sm mt-2 flex-wrap">
              <span>🚗 {b.carId?.seats || 5} seats</span>
              <span>⛽ Petrol</span>
              <span className="text-green-600 font-semibold">
                ₹{pricePerDay}/day
              </span>
            </div>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded text-white text-xs ${
                b.status === "confirmed"
                  ? "bg-green-500"
                  : b.status === "pending"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            >
              {b.status}
            </span>
            <p className="mt-2">
              <b>Payment:</b>{" "}
              <span
                className={`ml-2 px-2 py-1 rounded text-white text-xs ${
                  b.paymentStatus === "paid" ? "bg-green-600" : "bg-yellow-500"
                }`}
              >
                {b.paymentStatus === "paid" ? "Paid ✅" : "Pending 💰"}
              </span>
            </p>
          </div>
        </div>

        {/* TRIP */}
        <div className="mt-4 text-sm space-y-1">
          <p>📍Pickup: {b.pickupLocation}</p>
          <p>📅 {new Date(b.startDate).toLocaleDateString()}</p>

          <p>🏁Drop: {b.dropLocation}</p>
          <p>📅 {new Date(b.endDate).toLocaleDateString()}</p>

          <p className="text-blue-600 font-semibold mt-2">
            {days} {days === 1 ? "day" : "days"} trip
          </p>
        </div>

        {/* PRICE */}
        <div className="mt-4 bg-gray-50 p-4 rounded-xl border text-sm space-y-2">
          <div className="flex justify-between">
            <span>Base Price</span>
            <span>₹{basePrice}</span>
          </div>

          <div className="flex justify-between">
            <span>Government GST ({taxPercentage}%)</span>
            <span>₹{tax}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600 font-medium">
              <span>Discount Applied</span>
              <span>- ₹{discount}</span>
            </div>
          )}

          <div className="border-t pt-2 flex justify-between text-lg font-bold">
            <span>Final Payment</span>
            <span className="text-blue-600">₹{finalTotal}</span>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="mt-4 flex gap-2 justify-end">
          {/* WAITING */}
          {b.status === "pending" && (
            <p className="text-yellow-600 font-semibold">
              Waiting for admin approval...
            </p>
          )}

          {/* APPROVED → ALLOW PAYMENT */}
          {b.status === "confirmed" && b.paymentStatus !== "paid" && (
            <button
              onClick={() => handlePayment(b)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Continue to Payment
            </button>
          )}

          {b.paymentStatus === "paid" && b.driverId && (
            <div className="mt-4 bg-green-50 p-3 rounded-lg border">
              <h3 className="font-bold text-green-700 mb-2">
                🚗 Your Driver Details
              </h3>

              <p>
                <b>Name:</b> {b.driverId.name}
              </p>

              <p>
                <b>Phone:</b> {b.driverId.phone}
              </p>

              <p>
                <b>License:</b> {b.driverId.license}
              </p>
            </div>
          )}

          {/*  CANCEL */}
          {b.status === "cancelled" && (
            <button
              onClick={() => deleteBooking(b._id)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      {pending.map(renderCard)}
      {confirmed.map(renderCard)}
      {cancelled.map((b) => renderCard(b, true))}
    </div>
  );
};

export default MyBookings;
