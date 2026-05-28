import { Copy, Trash2 } from "lucide-react";

import React, { useEffect, useState } from "react";

import instance from "../instances/instance";

import { useAuth } from "../context/AuthContext";

const Offers = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  const [offers, setOffers] = useState([]);

  const [activeTab, setActiveTab] = useState("all");

  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    code: "",
    desc: "",
    type: "all",
    img: "",
  });

  // FETCH OFFERS
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await instance.get("/offers");

      setOffers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // CREATE OFFER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await instance.post("/offers", formData);

      fetchOffers();

      setFormData({
        title: "",
        code: "",
        desc: "",
        type: "all",
        img: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deleteOffer = async (id) => {
    try {
      await instance.delete(`/offers/${id}`);

      fetchOffers();
    } catch (err) {
      console.log(err);
    }
  };

  // FILTER
  const filteredOffers =
    activeTab === "all"
      ? offers
      : offers.filter((item) => item.type === activeTab);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

    const data = new FormData();

    data.append("file", file);

    data.append("upload_preset", "car_rental");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dcstbjyev/image/upload",
        {
          method: "POST",
          body: data,
        },
      );

      const uploadedImage = await res.json();

      setFormData((prev) => ({
        ...prev,
        img: uploadedImage.secure_url,
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* TITLE */}
      <h2 className="text-4xl font-bold text-center py-8">Offers</h2>

      {/* ADMIN FORM */}
      {isAdmin && (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-3xl shadow mb-10">
          <h3 className="text-2xl font-bold mb-5">Add Offer</h3>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              placeholder="Offer Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Coupon Code"
              value={formData.code}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  code: e.target.value,
                })
              }
              className="border p-3 rounded-xl"
            />

            <textarea
              placeholder="Description"
              value={formData.desc}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  desc: e.target.value,
                })
              }
              className="border p-3 rounded-xl"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border p-3 rounded-xl"
            />

            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value,
                })
              }
              className="border p-3 rounded-xl"
            >
              <option value="all">All</option>

              <option value="bank">Bank</option>

              <option value="seasonal">Seasonal</option>
            </select>

            <button className="bg-blue-600 text-white py-3 rounded-xl">
              Add Offer
            </button>
          </form>
        </div>
      )}

      {/* TABS */}
      <div className="flex justify-center gap-4 mb-10">
        {["all", "bank", "seasonal"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 pb-16">
        {filteredOffers.map((offer) => (
          <div
            key={offer._id}
            className="bg-white rounded-3xl shadow overflow-hidden relative"
          >
            {/* DELETE */}
            {isAdmin && (
              <button
                onClick={() => deleteOffer(offer._id)}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full"
              >
                <Trash2 size={18} />
              </button>
            )}

            <img src={offer.img} className="h-40 w-full object-cover" />

            <div className="p-6">
              <h2 className="text-xl font-bold">{offer.title}</h2>

              <p className="text-gray-500 mt-2">{offer.desc}</p>

              {/* CODE */}
              <div className="bg-gray-100 px-4 py-2 rounded-xl flex justify-between mt-5">
                <span className="font-semibold text-blue-600">
                  {offer.code}
                </span>

                <Copy
                  className="cursor-pointer"
                  size={18}
                  onClick={() => navigator.clipboard.writeText(offer.code)}
                />
              </div>

              <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded-xl">
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
