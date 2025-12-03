import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import Newsletter from "../components/Newsletter";

export default function Contact() {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-28 py-14 border-t border-gray-400">

      {/* ---------- Title ---------- */}
      <h2 className="text-3xl font-bold text-center mb-10 tracking-wide">
        CONTACT US
      </h2>

      {/* ---------- Contact Container ---------- */}
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <img
          src={assets.contact_img}
          alt="contact"
          className="w-full rounded-xl shadow-lg object-cover"
        />

        {/* Info box */}
        <div className="bg-white space-y-6 text-gray-700 leading-relaxed">

          <div>
            <h3 className="text-xl font-semibold mb-1">Our Store</h3>
            <p>54709 Willms Station Suite 350</p>
            <p>Washington, USA</p>
          </div>

          <div>
            <p><span className="font-semibold">Tel:</span> (415) 555-0132</p>
            <p><span className="font-semibold">Email:</span> admin@forever.com</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Careers at Forever</h3>
            <p>Learn more about our teams and job openings.</p>
          </div>

          <button
            className="bg-black text-white px-6 py-3 rounded-lg font-medium w-fit hover:bg-gray-800 transition-all"
          >
            Explore Jobs
          </button>

        </div>

      </div>

      <Newsletter/>

    </div>
  );
}
