import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Car, CarIcon } from "lucide-react";
import { loginUser } from "../services/authServices";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

   const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser(form);

    console.log(res);

    const user = res.user;
     localStorage.setItem("user", JSON.stringify(user));
    login(user);

    const role = user?.role?.toLowerCase();

    if (role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else if (role === "customer") {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
    
  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* CENTER BOX */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex w-[900px]">

        {/* LEFT - IMAGE */}
        <div className="w-1/2 hidden md:block relative">

  {/* IMAGE */}
  <img
    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
    alt="car"
    className="h-full w-full object-cover"
  />

  {/* GRADIENT OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent"></div>

  {/* TEXT ON TOP */}
  <div className="absolute top-6 left-6 text-white">

    <h2 className="text-2xl font-bold flex items-center gap-2">
      <CarIcon size={24} />
      Welcome Back
    </h2>

    <p className="text-sm text-gray-200 mt-2 max-w-xs">
      Login to continue booking your favorite cars easily.
    </p>

  </div>

</div>

        {/* RIGHT - FORM */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Login 🚗
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={form.email}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={form.password}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>

          </form>

          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer"
            >
              Register
            </span>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;