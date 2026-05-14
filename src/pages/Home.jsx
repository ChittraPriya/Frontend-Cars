import React from "react";
import Navbar from "../components/Navbar";
import Reviews from "../components/Review";
import Footer from "../components/Footer";
import Features from "../components/Features";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* HERO SECTION */}
      {/* HERO SECTION - FULL WIDTH BACKGROUND IMAGE */}
<section className="relative w-full h-[90vh]">

  {/* BACKGROUND IMAGE */}
  <img
    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
    alt="car"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* CONTENT ON TOP */}
  <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 text-white">

    <span className="bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm w-fit">
      Premium Car Booking
    </span>

    <h1 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
      Book Your Perfect Car <br />
      <span className="text-gray-200">for Every Journey</span>
    </h1>

    <p className="text-gray-200 mt-4 max-w-xl">
      Choose from a wide range of vehicles and book instantly.
      Fast, easy and reliable car booking system.
    </p>

    {/* SEARCH BOX */}
    <div className="bg-white/90 text-black shadow-lg p-4 mt-6 rounded-xl flex gap-3 flex-wrap w-full max-w-2xl">

      <input
        className="border p-2 rounded w-40"
        placeholder="Pick-up location"
      />

      <input type="date" className="border p-2 rounded" />

      <input type="date" className="border p-2 rounded" />

      <button className="bg-black text-white px-6 py-2 rounded-lg">
        Search Cars
      </button>

    </div>

  </div>
</section>

      <Features />
      <Reviews />
      <Footer />

    </div>
  );
};

export default Home;