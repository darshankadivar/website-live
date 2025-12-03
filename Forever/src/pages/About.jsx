import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import Newsletter from "../components/Newsletter";

export default function About() {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-28 py-12 border-t border-gray-400">

      {/* ---------- Title ---------- */}
      <h2 className="text-3xl font-bold text-center mb-10 tracking-wide">
        ABOUT US
      </h2>

      {/* ---------- About Section ---------- */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">

        <img
          src={assets.about_img}
          alt="about"
          className="w-full rounded-xl shadow-lg object-cover"
        />

        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online.
            Our journey began with a simple idea: to provide a platform where customers can easily discover, explore,
            and purchase a wide range of products from the comfort of their homes.
          </p>

          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that
            cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer
            an extensive collection sourced from trusted brands and suppliers.
          </p>

          <div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>
              Our mission at Forever is to empower customers with choice, convenience, and confidence.
              We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing
              and ordering to delivery and beyond.
            </p>
          </div>
        </div>

      </div>


      {/* ---------- Why Choose Us ---------- */}
      <h2 className="text-3xl font-bold text-center mb-8 tracking-wide">
        WHY CHOOSE US
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

        {/* Box 1 */}
        <div className="bg-white border border-gray-400 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
          <h3 className="font-semibold text-lg mb-2">Quality Assurance</h3>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our stringent quality standards.
          </p>
        </div>

        {/* Box 2 */}
        <div className="bg-white border border-gray-400 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
          <h3 className="font-semibold text-lg mb-2">Convenience</h3>
          <p className="text-gray-600">
            With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
          </p>
        </div>

        {/* Box 3 */}
        <div className="bg-white border border-gray-400 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all">
          <h3 className="font-semibold text-lg mb-2">Exceptional Service</h3>
          <p className="text-gray-600">
            Our dedicated team is here to assist you every step of the way, ensuring your satisfaction is our top priority.
          </p>
        </div>

      </div>

      <Newsletter />

    </div>
  );
}
