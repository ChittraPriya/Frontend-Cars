import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../instances/instance";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [method, setMethod] = useState("upi"); // 👈 selected tab

  // ================= FETCH BOOKING =================
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await instance.get(`/bookings/${bookingId}`);
        setBooking(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading booking...
      </div>
    );
  }

  const days =
    Math.ceil(
      (new Date(booking.endDate) - new Date(booking.startDate)) /
        (1000 * 60 * 60 * 24),
    ) || 1;

  const basePrice = days * (booking.carId?.pricePerDay || 0);
  const tax = Math.round(basePrice * 0.2);
  const discount = 10;
  const totalAmount = basePrice + tax - discount;

  // ================= PAYMENT =================
  const handlePayment = async () => {
    try {
      const { data } = await instance.post("/payment/create-order", {
        amount: totalAmount,
      });

      const options = {
        key: "rzp_test_SoRIxgcnV809XD",
        amount: data.amount,
        currency: "INR",
        order_id: data.id,
        name: "Car Rental System",
        description: `Payment via ${method.toUpperCase()}`,

        prefill: {
          name: "Test User",
          email: "test@gmail.com",
          contact: "9999999999",
        },

        handler: async function (response) {
          await instance.post("/payment/verify", {
            ...response,
            bookingId,
          });

          alert("Payment Successful");
          navigate("/bookings");
        },
        
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold">Payment</h1>
        <h4 className="text-gray-600 mt-2">
          Complete your payment to confirm booking
        </h4>
      </div>

      <section className="max-w-6xl mx-auto bg-white rounded-[32px] shadow p-8">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* ================= LEFT: PAYMENT ================= */}
          <div className="border rounded-3xl p-6">
            <h2 className="text-2xl font-semibold mb-6">
              Select Payment Method
            </h2>

            {/* 🔥 TABS */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setMethod("upi")}
                className={`px-4 py-2 rounded-xl border ${
                  method === "upi" ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                UPI
              </button>

              <button
                onClick={() => setMethod("card")}
                className={`px-4 py-2 rounded-xl border ${
                  method === "card" ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                Card
              </button>

              <button
                onClick={() => setMethod("wallet")}
                className={`px-4 py-2 rounded-xl border ${
                  method === "wallet" ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                Wallet
              </button>
            </div>

            {/* 🔽 METHOD UI */}
            {method === "upi" && (
              <div className="space-y-4">
                <input
                  placeholder="Enter UPI ID (example@upi)"
                  className="w-full border p-3 rounded-xl"
                />
                <p className="text-sm text-gray-500">
                  Pay instantly using Google Pay / PhonePe / Paytm
                </p>
              </div>
            )}

            {method === "card" && (
              <div className="space-y-3">
                <input
                  placeholder="Card Number"
                  className="w-full border p-3 rounded-xl"
                />
                <input
                  placeholder="Card Holder Name"
                  className="w-full border p-3 rounded-xl"
                />
                <div className="flex gap-3">
                  <input
                    placeholder="MM/YY"
                    className="w-full border p-3 rounded-xl"
                  />
                  <input
                    placeholder="CVV"
                    className="w-full border p-3 rounded-xl"
                  />
                </div>
              </div>
            )}

            {method === "wallet" && (
              <div className="space-y-3">
                <div className="border p-4 rounded-xl">
                  <p>Paytm Wallet</p>
                </div>
                <div className="border p-4 rounded-xl">
                  <p>PhonePe Wallet</p>
                </div>
              </div>
            )}

            <button
              onClick={handlePayment}
              className="w-full mt-6 bg-blue-600 text-white py-4 rounded-2xl text-lg font-semibold"
            >
              Pay ₹{totalAmount}
            </button>

            <p className="text-xs text-gray-500 mt-3">
              By continuing you agree to terms & conditions
            </p>
          </div>

          {/* ================= RIGHT: SUMMARY ================= */}
          <div className="border rounded-3xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Booking Summary</h2>

            <div className="flex gap-4 border p-4 rounded-2xl">
              <img
                src={booking.carId?.image}
                className="w-32 h-24 object-cover rounded-xl"
              />

              <div>
                <h3 className="font-bold text-xl">{booking.carId?.name}</h3>

                <p>Days: {days}</p>
                <p>Base: ₹{basePrice}</p>
                <p>Tax: ₹{tax}</p>
                <p className="text-green-600">Discount: -₹{discount}</p>

                <h4 className="text-blue-600 font-bold text-xl mt-2">
                  Total ₹{totalAmount}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentPage;
