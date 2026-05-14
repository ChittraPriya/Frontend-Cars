import React from "react";

const AuthLayout = ({ children, image, reverse }) => {
  return (
    <div className="min-h-screen flex">

      {/* IMAGE SIDE */}
      <div className={`hidden md:block w-1/2 ${reverse ? "order-2" : "order-1"}`}>
        <img
          src={image}
          className="h-full w-full object-cover"
          alt="auth"
        />
      </div>

      {/* FORM SIDE */}
      <div className={`w-full md:w-1/2 flex items-center justify-center bg-gray-50 ${reverse ? "order-1" : "order-2"}`}>
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;