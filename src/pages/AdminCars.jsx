import React, { useEffect, useState } from "react";
import instance from "../instances/instance";

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "",
    pricePerDay: "",
    image: "",
    model: "",
    brand: "",
  });

  const [editId, setEditId] = useState(null);

  // FETCH CARS
  const fetchCars = async () => {
    const res = await instance.get("/cars");
    const data = await res.json();
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD CAR
  const addCar = async () => {
    await instance.post("/cars", form);
     
      setForm({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", type: "", pricePerDay: "", image: "" ,model: "", brand: ""});
    fetchCars();
  };

  // DELETE CAR
  const deleteCar = async (id) => {
    await instance.delete(`/cars/${id}`);
    fetchCars();
  };

  // EDIT CAR (load data)
  const startEdit = (car) => {
    setForm(car);
    setEditId(car._id);
  };

  // UPDATE CAR
  const updateCar = async () => {
   await instance.put(`/cars/${editId}`, form);
   setForm({
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", type: "", pricePerDay: "", image: "" ,model: "", brand: ""});
    setEditId(null);
    fetchCars();
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Admin - Manage Cars</h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow mb-8 grid md:grid-cols-4 gap-3">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Car Name"
          className="border p-2 rounded"
        />

        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Type (SUV/Sedan)"
          className="border p-2 rounded"
        />

        <input
          name="brand"
          placeholder="Brand"
          value={form?.brand || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="model"
          placeholder="Model (2024)"
          value={form?.model || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="pricePerDay"
          value={form.pricePerDay}
          onChange={handleChange}
          placeholder="Price/Day"
          className="border p-2 rounded"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 rounded"
        />

        {editId ? (
          <button
            onClick={updateCar}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={addCar}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        )}

      </div>

      {/* CAR LIST */}
      <div className="grid md:grid-cols-3 gap-6">

        {cars.map((car) => (
          <div key={car._id} className="bg-white p-4 rounded shadow">

            <img
              src={car.image}
              alt={car.name}
              className="h-40 w-full object-cover rounded"
            />

            <h2 className="font-bold mt-2">{car.name}</h2>
            <p className="text-gray-500">{car.type}</p>
            <p className="text-blue-600">₹{car.pricePerDay}/day</p>

            <div className="flex justify-between mt-3">

              <button
                onClick={() => startEdit(car)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCar(car._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminCars;