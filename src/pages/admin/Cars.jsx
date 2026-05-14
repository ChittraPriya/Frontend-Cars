import React, { useEffect, useState } from "react";
import instance from "../../instances/instance";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [editId, setEditId] = useState(null);
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    seats: "",
    fuelType: "",
    pricePerDay: "",
    description: "",
  });

  // Fetch cars
  const fetchCars = async () => {
    try {
      const res = await instance.get("/cars");
      setCars(res.data.cars || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  console.log("FORM STATE:", form);
}, [form]);

  useEffect(() => {
    fetchCars();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add OR Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("brand", form.brand);
      formData.append("model", form.model);
      formData.append("seats", form.seats);
      formData.append("fuelType", form.fuelType);
      formData.append("pricePerDay", form.pricePerDay);
      formData.append("description", form.description);

      if (file) {
        formData.append("image", file);
      }

      if (editId) {
        await instance.put(`/cars/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditId(null);
      } else {
        await instance.post("/cars", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({
        name: "",
        brand: "",
        model: "",
        seats: "",
        fuelType: "",
        pricePerDay: "",
        description: "",
      });

      setFile(null);
      fetchCars();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  //  Edit
  const handleEdit = (car) => {
    setForm({
      name: car.name,
      brand: car.brand,
      model: car.model,
      seats: car.seats,
      fuelType: car.fuelType,
      pricePerDay: car.pricePerDay,
      description: car.description,
    });

    setEditId(car._id);
  };

  //  Delete
  const handleDelete = async (id) => {
    try {
      await instance.delete(`/cars/${id}`);
      fetchCars();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cars Management</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 space-y-3"
      >
        <input
          type="text"
          name="name"
          placeholder="Car Name"
          value={form?.name || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
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
          name="seats"
          type="number"
          placeholder="Seats"
          value={form?.seats || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="fuelType"
          value={form?.fuelType || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Fuel Type</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
          <option value="cng">CNG</option>
        </select>

        <input
          type="text"
          name="pricePerDay"
          placeholder="Price (₹/day)"
          value={form?.pricePerDay || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form?.description || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update Car" : "Add Car"}
        </button>
      </form>

      {/*  CAR LIST */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        {cars.map((car) => (
          <div
            key={car._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div className="flex items-center gap-4">
              <img
                src={car.image}
                alt={car.name}
                className="w-16 h-12 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{car.name}</p>
                <p className="text-sm text-gray-500">{car.pricePerDay}</p>
              </div>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(car)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(car._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
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

export default Cars;
