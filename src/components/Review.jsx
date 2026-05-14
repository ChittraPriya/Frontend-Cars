import React from "react";
import { Star } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      name: "Arun Kumar",
      image: "https://i.pravatar.cc/100?img=1",
      rating: 5,
      comment:
        "Very smooth booking process. Car was clean and well maintained!",
    },
    {
      name: "Priya S",
      image: "https://i.pravatar.cc/100?img=2",
      rating: 4,
      comment: "Good service and affordable prices. Will book again!",
    },
    {
      name: "Rahul",
      image: "https://i.pravatar.cc/100?img=3",
      rating: 5,
      comment: "Excellent experience. Pickup and drop was very easy.",
    },
    {
      name: "Divya",
      image: "https://i.pravatar.cc/100?img=4",
      rating: 5,
      comment: "Amazing cars and very professional service!",
    },
  ];

  // duplicate for smooth infinite scroll
  const loopReviews = [...reviews, ...reviews];

  return (
    <div className="bg-gray-50 py-14 overflow-hidden">

      <h2 className="text-3xl font-bold text-center mb-10">
        What Our Customers Say ⭐
      </h2>

      {/* SCROLL WRAPPER */}
      <div className="relative">

        <div className="flex w-max gap-6 animate-scroll">

          {loopReviews.map((r, i) => (
            <div
              key={i}
              className="min-w-[300px] bg-white p-6 rounded-2xl shadow-md"
            >
              {/* USER */}
              <div className="flex items-center gap-3 mb-4">

                <img
                  src={r.image}
                  alt={r.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold">{r.name}</h3>

                  <div className="flex text-yellow-500">
                    {Array.from({ length: r.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={16}
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                </div>

              </div>

              <p className="text-gray-600 text-sm">{r.comment}</p>
            </div>
          ))}

        </div>

      </div>

      {/* ANIMATION STYLE */}
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
        `}
      </style>

    </div>
  );
};

export default Reviews;