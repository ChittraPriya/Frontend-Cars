import React from "react";
import {
  BadgeDollarSign,
  CarFront,
  Headphones,
  ShieldCheck,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      id: 1,
      title: "Affordable Prices",
      description:
        "Get the best rates and amazing deals every day for your travel needs.",
      icon: <BadgeDollarSign size={34} />,
    },
    {
      id: 2,
      title: "Wide Selection",
      description:
        "Choose from luxury, SUV, sedan, and budget-friendly vehicles.",
      icon: <CarFront size={34} />,
    },
    {
      id: 3,
      title: "Safe & Reliable",
      description:
        "Well-maintained cars for a smooth and secure ride experience.",
      icon: <ShieldCheck size={34} />,
    },
    {
      id: 4,
      title: "24/7 Support",
      description:
        "Our support team is always ready to help anytime, anywhere.",
      icon: <Headphones size={34} />,
    },
  ];

  return (
    <section className="mt-10 w-full bg-blue-300 py-20 px-6 md:px-12 rounded-[40px]">

      {/* HEADING */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Why Choose CarBook?
        </h2>

        <p className="text-gray-600 mt-4 text-lg">
          Premium car rental experience with comfort and reliability
        </p>
      </div>

      {/* FEATURE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {features.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >

            {/* ICON */}
            <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {item.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-500 text-[15px] leading-relaxed">
              {item.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Features;