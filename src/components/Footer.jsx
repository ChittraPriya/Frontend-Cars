import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaInstagramSquare,
  FaTwitter,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";

import { Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white mt-10">

      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold">CarBook 🚗</h2>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            Fast, reliable and affordable car booking platform for your
            everyday travel needs.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-5">

            <div className="p-2 bg-white/10 rounded-full hover:bg-blue-600 transition cursor-pointer">
              <FaFacebookF size={18} />
            </div>

            <div className="p-2 bg-white/10 rounded-full hover:bg-pink-500 transition cursor-pointer">
              <FaInstagramSquare size={18} />
            </div>

            <div className="p-2 bg-white/10 rounded-full hover:bg-sky-500 transition cursor-pointer">
              <FaTwitterSquare size={18} />
            </div>

            <div className="p-2 bg-white/10 rounded-full hover:bg-red-600 transition cursor-pointer">
              <FaYoutube size={18} />
            </div>

          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Cars</li>
            <li className="hover:text-white cursor-pointer">Bookings</li>
            <li className="hover:text-white cursor-pointer">About</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Support</h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Terms</li>
            <li className="hover:text-white cursor-pointer">Privacy</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Contact</h3>

          <div className="space-y-3 text-gray-400 text-sm">

            <p className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </p>

            <p className="flex items-center gap-2">
              <Mail size={16} /> support@carbook.com
            </p>

          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CarBook. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;