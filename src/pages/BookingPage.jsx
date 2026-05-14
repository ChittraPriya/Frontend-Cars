import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../instances/instance";

const BookingPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  // FETCH CAR
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);

        const res = await instance.get(`/cars/${carId}`);

        if (!res.data) {
          setError("Car not found");
          return;
        }

        setCar(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load car");
      } finally {
        setLoading(false);
      }
    };

    if (carId) fetchCar();
  }, [carId]);

  // PRICE CALCULATION
  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // allow same-day booking
      if (end >= start) {
        const diffTime = end - start;

        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

        setTotalDays(days);
        setTotalPrice(days * car.pricePerDay);
      } else {
        // invalid case
        setTotalDays(0);
        setTotalPrice(0);
      }
    }
  }, [startDate, endDate, car]);

  // BOOKING
  const handleBooking = async () => {
  // ✅ VALIDATION
  if (
    !startDate ||
    !endDate ||
    !pickupLocation ||
    !dropLocation ||
    !pickupTime
  ) {
    return alert("Please fill all fields");
  }

  console.log("BOOKING PAYLOAD:", {
    carId,
    startDate,
    endDate,
    pickupLocation,
    dropLocation,
    pickupTime,
  });

  try {
    const res = await instance.post(
      "/bookings/create",
      {
        carId,
        startDate,
        endDate,
        pickupLocation,
        dropLocation,
        pickupTime, 
      },
      { withCredentials: true }
    );

    alert("Booking Successful!");

    navigate("/bookings", {
      state: { newBooking: res.data.booking },
    });

  } catch (err) {
    console.log("ERROR RESPONSE:", err.response?.data);
    alert(err.response?.data?.message || "Booking failed");
  }
};

  // LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading car details...</p>
      </div>
    );
  }

  // ERROR UI
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // NO CAR UI
  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No car data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl grid md:grid-cols-2 rounded-xl shadow-lg overflow-hidden">
        {/* CAR INFO */}
        <div className="p-5 bg-gray-50">
          <img
            src={car.image}
            className="w-full h-56 object-cover rounded-lg"
            alt={car.name}
          />

          <h2 className="text-2xl font-bold mt-3">{car.name}</h2>

          <p className="text-gray-600">{car.brand}</p>

          <p className="mt-2 text-green-600 font-bold">
            ₹{car.pricePerDay}/day
          </p>
        </div>

        {/* BOOKING FORM */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Book This Car</h2>

          {/* DATE */}
          <input
            type="date"
            className="w-full border p-2 mb-3"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            className="w-full border p-2 mb-3"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          {/* PICKUP */}
          <input
            type="text"
            className="w-full border p-2 mb-3"
            placeholder="Pickup Location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />

          {/* DROP */}
          <input
            type="text"
            className="w-full border p-2 mb-3"
            placeholder="Drop Location"
            value={dropLocation}
            onChange={(e) => setDropLocation(e.target.value)}
          />

          {/* PICKUP TIME */}
          <input
            type="time"
            className="w-full border p-2 mb-3"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          />

          {/* SUMMARY */}
          <div className="bg-gray-100 p-3 rounded mb-4">
            <p>Days: {totalDays}</p>
            <p className="font-bold text-green-600">Total: ₹{totalPrice}</p>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleBooking}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
