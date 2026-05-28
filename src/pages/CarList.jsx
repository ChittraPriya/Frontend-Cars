import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../instances/instance";

const Cars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]); 

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await instance.get("/cars");
        setCars(res.data.cars || []); 
      } catch (error) {
        console.log(error);
        setCars([]); 
      }
    };

    fetchCars();
  }, []);

  console.log(cars);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Browse Cars 🚗</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {Array.isArray(cars) && cars.map((car) => ( 
          <div key={car._id} className="bg-white p-4 rounded-xl shadow">

            <div className="w-full h-40 bg-gray-50 rounded flex items-center justify-center">
              <img
                src={car.image}
                className="h-full object-contain"
                alt={car.name}
              />
            </div>

            <h3 className="mt-4 font-semibold">{car.name}</h3>
            <p className="text-gray-500 text-sm">{car.pricePerDay}</p>

            <button
              onClick={() => navigate(`/bookings/${car._id}`)} //
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Book Now
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;