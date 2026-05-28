import React from "react";

const AuthLayout = ({
  children,
  image,
  reverse,
  title = "Welcome Back",
  subtitle = "Book your dream car easily",
}) => {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* IMAGE SIDE */}
      <div
        className={`hidden md:flex w-1/2 relative overflow-hidden ${
          reverse ? "order-2" : "order-1"
        }`}
      >

        {/* IMAGE */}
        <img
          src={image}
          alt="auth"
          className="h-full w-full object-cover scale-105 hover:scale-110 transition duration-700"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-12 text-white">

          <h1 className="text-5xl font-bold leading-tight">
            {title}
          </h1>

          <p className="mt-4 text-lg text-gray-200 max-w-md">
            {subtitle}
          </p>

        </div>

      </div>

      {/* FORM SIDE */}
      <div
        className={`w-full md:w-1/2 flex items-center justify-center p-6 ${
          reverse ? "order-1" : "order-2"
        }`}
      >

        {/* GLASS CARD */}
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/40">

          {children}

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;