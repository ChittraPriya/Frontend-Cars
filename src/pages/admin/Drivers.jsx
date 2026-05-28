import React, { useEffect, useState } from "react";
import instance from "../../instances/instance";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    license: "",
    phone: "",
  });

  // ================= FETCH DRIVERS =================
  const fetchDrivers = async () => {
    try {
      const res = await instance.get("/drivers");
      const data = res.data?.drivers || res.data || [];
      setDrivers(data);
    } catch (err) {
      console.log(err);
      setDrivers([]);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // ================= ADD DRIVER =================
  const handleAddDriver = async () => {
    try {
      await instance.post("/drivers", form);

      alert("Driver added");

      setForm({ name: "", license: "", phone: "" });
      fetchDrivers();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= TOGGLE STATUS =================
  const toggleStatus = async (id) => {
    try {
      await instance.put(`/drivers/${id}/toggle`);
      fetchDrivers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🚗 Drivers</h1>

      {/* ================= ADD DRIVER ================= */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-2">Add Driver</h2>

        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="License"
            value={form.license}
            onChange={(e) =>
              setForm({ ...form, license: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="border p-2 rounded"
          />

          <button
            onClick={handleAddDriver}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* ================= DRIVER LIST ================= */}
      <div className="grid md:grid-cols-2 gap-4">
        {drivers.map((d) => (
          <div
            key={d._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{d.name}</p>
              <p className="text-sm text-gray-500">
                License: {d.license}
              </p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={
                    d.status === "Available"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {d.status}
                </span>
              </p>
            </div>

            <button
              onClick={() => toggleStatus(d._id)}
              className={`px-3 py-1 rounded text-white ${
                d.status === "Available"
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            >
              {d.status === "Available"
                ? "Set Busy"
                : "Set Available"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drivers;