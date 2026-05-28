import React, { useState } from "react";
import { Star, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Reviews = () => {

  // GET USER FROM AUTH CONTEXT
  const { user } = useAuth();

  // LOGIN CHECK
  const isLoggedIn = !!user;

  // ADMIN CHECK
  const isAdmin = user?.role === "admin";

  const initialReviews = [
    {
      id: 1,
      name: "Arun Kumar",
      image: "https://i.pravatar.cc/100?img=1",
      rating: 5,
      comment:
        "Very smooth booking process. Car was clean and well maintained!",
    },
    {
      id: 2,
      name: "Priya",
      image: "https://i.pravatar.cc/100?img=2",
      rating: 4,
      comment: "Good service and affordable prices!",
    },
  ];

  const [reviews, setReviews] = useState(initialReviews);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    comment: "",
    rating: 0,
    image: "",
  });

  // DELETE REVIEW
  const handleDelete = (id) => {
    setReviews(
      reviews.filter((review) => review.id !== id)
    );
  };

  // ADD REVIEW
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.comment || formData.rating === 0) {
      alert("Please add review and rating");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: formData.name,
      image:
        formData.image ||
        "https://i.pravatar.cc/100",
      rating: formData.rating,
      comment: formData.comment,
    };

    setReviews([newReview, ...reviews]);

    setFormData({
      name: user?.name || "",
      comment: "",
      rating: 0,
      image: "",
    });
  };

  return (
    <div className="bg-gray-50 py-14 overflow-hidden">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center mb-10">
        What Our Customers Say ⭐
      </h2>

      {/* REVIEW FORM ONLY AFTER LOGIN */}
      {isLoggedIn && (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg mb-14">

          <h3 className="text-2xl font-semibold mb-6 text-center">
            Add Your Review
          </h3>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* COMMENT */}
            <textarea
              rows="4"
              placeholder="Write your review..."
              value={formData.comment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  comment: e.target.value,
                })
              }
              className="w-full border border-gray-300 p-3 rounded-xl outline-none"
            />

            {/* STAR RATING */}
            <div className="flex gap-2">

              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={30}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      rating: star,
                    })
                  }
                  className={`cursor-pointer transition ${
                    formData.rating >= star
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}

            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition"
            >
              Submit Review
            </button>

          </form>

        </div>
      )}

      {/* REVIEWS SCROLL */}
      <div className="relative overflow-hidden">

        <div className="flex w-max gap-6 animate-scroll hover:[animation-play-state:paused]">

          {[...reviews, ...reviews].map((r, i) => (
            <div
              key={i}
              className="relative min-w-[320px] bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >

              {/* DELETE ONLY ADMIN */}
              {isAdmin && (
                <button
                  onClick={() => handleDelete(r.id)}
                  className="absolute top-3 right-3 bg-red-100 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-full transition"
                >
                  <Trash2 size={18} />
                </button>
              )}

              {/* USER */}
              <div className="flex items-center gap-3 mb-4">

                <img
                  src={r.image}
                  alt={r.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>

                  <h3 className="font-semibold">
                    {r.name}
                  </h3>

                  <div className="flex text-yellow-500">

                    {Array.from({
                      length: r.rating,
                    }).map((_, idx) => (
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

              {/* COMMENT */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {r.comment}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* ANIMATION */}
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