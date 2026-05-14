import { BadgePercent, Copy } from "lucide-react";
import React, { useState } from "react";

const Offers = () => {
  const [activeTab, setActiveTab] = useState("all");

  const offers = [
    {
      id: 1,
      type: "seasonal",
      title: "Flat 15% OFF",
      code: "DRIVE15",
      desc: "Get flat 15% off on all bookings",
      img: "https://source.unsplash.com/400x300/?car,sport",
    },
    {
      id: 2,
      type: "seasonal",
      title: "Weekend Special",
      code: "WEEKEND20",
      desc: "Save more on weekend rides",
      img: "https://source.unsplash.com/400x300/?road,car",
    },
    {
      id: 3,
      type: "bank",
      title: "HDFC Bank Offer",
      code: "HDFC25",
      desc: "25% cashback using HDFC cards",
      img: "https://source.unsplash.com/400x300/?bank,card",
    },
    {
      id: 4,
      type: "bank",
      title: "ICICI Discount",
      code: "ICICI20",
      desc: "Flat 20% off for ICICI users",
      img: "https://source.unsplash.com/400x300/?money,bank",
    },
    {
      id: 5,
      type: "all",
      title: "First Ride Offer",
      code: "FIRST10",
      desc: "Extra discount for first-time users",
      img: "https://source.unsplash.com/400x300/?car,travel",
    },
  ];

  const filteredOffers =
    activeTab === "all"
      ? offers
      : offers.filter((item) => item.type === activeTab);

  return (
    <div className="bg-gray-50">

      {/* PAGE TITLE */}
      <h2 className="text-4xl font-bold text-center py-8">
        Offers
      </h2>

      {/* HERO BANNER */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
          className="w-full h-full object-cover rounded-3xl"
        />

        <div className="absolute inset-0 bg-black/60 rounded-3xl flex flex-col justify-center px-10 text-white">

          <h3 className="text-3xl md:text-5xl font-bold">
            Special Summer Offer ☀️
          </h3>

          <p className="mt-3 text-lg">
            Get up to <b>30% OFF</b> on selected cars
          </p>

          <p className="mt-2">
            Use Code: <span className="font-bold">SUMMER30</span>
          </p>

          <p className="text-sm mt-2 text-gray-200">
            Valid till 30 June 2026
          </p>

        </div>
      </div>

      {/* TABS */}
      <div className="flex justify-center gap-4 mt-10">

        {["all", "bank", "seasonal"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-semibold transition
              ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border"
              }`}
          >
            {tab === "all"
              ? "All Offers"
              : tab === "bank"
              ? "Bank Offers"
              : "Seasonal Offers"}
          </button>
        ))}

      </div>

      {/* OFFERS GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-10 px-6 pb-16">

        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden"
          >

            <img
              src={offer.img}
              className="h-40 w-full object-cover"
            />

            <div className="p-6">

              <h2 className="text-xl font-bold">{offer.title}</h2>

              <p className="text-gray-500 mt-2">{offer.desc}</p>

              {/* CODE */}
              <div className="bg-gray-100 px-4 py-2 rounded-xl flex justify-between mt-5">
                <span className="font-semibold text-blue-600">
                  {offer.code}
                </span>

                <Copy className="cursor-pointer text-gray-500 hover:text-blue-600" size={18} />
              </div>

              <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                Apply Offer
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Offers;