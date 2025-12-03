import React from "react";
import { assets } from "../assets/frontend_assets/assets";

export default function OurPolicy() {
  return (
    <div className="w-full py-14">
      
      {/* Main Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10">

        {/* Card 1 */}
        <div className="flex flex-col items-center text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-all">
          <img 
            src={assets.exchange_icon} 
            alt="Exchange Policy" 
            className="w-14 mb-4"
          />
          <p className="text-lg font-semibold text-gray-800">Easy Exchange Policy</p>
          <p className="text-gray-500 text-sm mt-2">
            We offer a hassle-free and quick exchange service.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-all">
          <img 
            src={assets.quality_icon} 
            alt="Return Policy" 
            className="w-14 mb-4"
          />
          <p className="text-lg font-semibold text-gray-800">7 Days Return Policy</p>
          <p className="text-gray-500 text-sm mt-2">
            Enjoy a simple and free 7-day return option.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center text-center  p-6 border rounded-xl shadow-sm hover:shadow-md transition-all">
          <img 
            src={assets.support_img} 
            alt="Customer Support" 
            className="w-14 mb-4"
          />
          <p className="text-lg font-semibold text-gray-800">Best Customer Support</p>
          <p className="text-gray-500 text-sm mt-2">
            Our team offers 24/7 customer assistance.
          </p>
        </div>
      </div>
      
    </div>
  );
}
