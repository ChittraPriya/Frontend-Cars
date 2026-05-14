import React from "react";

const CarCard = ({ car, onBook }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">

      <img
        src={car.image}
        alt={car.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">

        <h2 className="text-xl font-bold">{car.name}</h2>

        <p className="text-gray-500 text-sm">{car.type}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-blue-600 font-semibold">
            ₹{car.pricePerDay} / day
          </span>

          <button
            onClick={() => onBook(car)}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Book Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default CarCard;