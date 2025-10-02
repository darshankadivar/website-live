import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchOrders, deleteOrder, updateOrder } from "../features/orders/OrdersSlice";

export default function OrderList() {
  const dispatch = useDispatch();
  const { items: orders, status } = useSelector((state) => state.orders);

  // 🔹 Live clock state
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // 🔹 Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (status === "loading") {
    return <p className="text-center text-gray-600">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center text-gray-500">No orders found.</p>;
  }

  // 🔹 Date formatting
const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow rounded-lg text-sm md:text-base">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Products</th>
            <th className="p-2">Total</th>
            <th className="p-2">Date</th> {/* 🔹 Live Date */}
            <th className="p-2">Status</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t hover:bg-gray-50">
              <td className="p-2 font-mono text-xs text-gray-600">{order.id}</td>
              <td className="p-2">{order.customerName}</td>
              <td className="p-2">{order.contact}</td>
              <td className="p-2">
                {order.products.map((p, idx) => (
                  <div key={idx}>
                    {p.name} x {p.quantity} (₹{p.price})
                  </div>
                ))}
              </td>
              <td className="p-2 font-semibold text-gray-800">₹{order.total}</td>

              {/* 🔹 Show LIVE Date/Time instead of static order.date */}
              <td className="p-2">{formatDate(order.date)}</td>

              {/* 🔹 Status Dropdown */}
              <td className="p-2">
                <select
                  value={order.status}
                  onChange={(e) =>
                    dispatch(updateOrder({...order, orderId: order.id, status: e.target.value }))
                  }
                  className={`border rounded-lg px-2 py-1 text-sm ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Confirmed"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "Shipped"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>

              {/* 🔹 Delete Button */}
              <td className="p-2 text-center">
                <button
                  onClick={() => dispatch(deleteOrder(order.id))}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
