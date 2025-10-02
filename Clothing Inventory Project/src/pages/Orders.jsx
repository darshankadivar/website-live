import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrdersList";


export default function Orders() {
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* 🔹 Order Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Create New Order
          </h1>
          <OrderForm/>
        </div>

        {/* 🔹 Divider */}
        <hr className="border-gray-200" />

        {/* 🔹 Order List Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Orders List
          </h2>
          <OrderList/>
        </div>
      </div>
    </div>
  );
}
