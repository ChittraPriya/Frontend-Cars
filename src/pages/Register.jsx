import { Car } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authServices";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* CENTER CARD */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex w-[900px]">

        {/* LEFT - FORM */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Create Account 🚗
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">

            <input
              name="name"
              placeholder="Name"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Register
            </button>

          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>

        {/* RIGHT - IMAGE */}
        <div className="w-1/2 hidden md:block relative">

  {/* IMAGE */}
  <img
    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
    alt="car"
    className="h-full w-full object-cover"
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* TEXT CONTENT */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 text-center">

    <h2 className="text-3xl font-bold mb-3">
      <Car size={24} />
      Start Your Journey
    </h2>

    <p className="text-sm text-gray-200 max-w-xs">
      Discover the best cars and book your ride in seconds.
      Fast, secure, and reliable booking experience.
    </p>

  </div>

</div>

      </div>

    </div>
  );
};

export default Register;