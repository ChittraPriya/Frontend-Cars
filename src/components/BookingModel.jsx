import React, { useState } from "react";

const BookingModal = ({ car, onClose }) => {
  const [form, setForm] = useState({
    pickupLocation: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Booking data:", form, car);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-[400px]">

        <h2 className="text-xl font-bold mb-4">
          Book {car.name}
        </h2>

        <input
          name="pickupLocation"
          placeholder="Pickup Location"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          type="date"
          name="startDate"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          type="date"
          name="endDate"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <div className="flex justify-between mt-4">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Confirm
          </button>

        </div>

      </div>

    </div>
  );
};

export default BookingModal;