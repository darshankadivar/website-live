import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

export default function Order() {

  const { id } = useParams();
  const { orders } = useSelector((state) => state.order);

  const order = orders.find((o) => o.id == id);

  if (!order) {
    return (
      <div className="p-8 flex justify-center items-center">
        <p className="text-gray-500 text-lg">Order not found 🚫</p>
      </div>
    );
  }

  const items = order.products || [];

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">

      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 border-b pb-3">
        Order Details
      </h2>

      <div className="bg-white border rounded-xl p-4 sm:p-5 shadow-sm mb-8">
        <p className="text-gray-700 mb-1">
          <span className="font-medium">Order ID:</span> {order.id}
        </p>

        <p className="text-gray-700 mb-1">
          <span className="font-medium">Status:</span>{" "}
          <span className="text-green-600 font-semibold">Pending</span>
        </p>

        <p className="text-gray-700 mb-1">
          <span className="font-medium">Date:</span> {order.date}
        </p>

        <p className="mt-2 font-semibold text-xl">
          Total: ₹{order.totalPrice}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((p, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-4 border rounded-xl p-4 sm:p-5 shadow-sm bg-white hover:shadow-md transition"
          >

            <img
              src={p.image}
              alt={p.title}
              className="w-full sm:w-32 h-32 object-cover rounded-lg"
            />

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{p.title}</h3>

                <p className="text-gray-600">
                  Size: <span className="font-medium">{p.size}</span>
                </p>

                <p className="text-gray-600">
                  Quantity: <span className="font-medium">{p.quantity}</span>
                </p>

                <p className="text-gray-900 font-semibold mt-1">
                  ₹{p.price * p.quantity}
                </p>

                <p className="text-green-600 font-medium mt-1">
                  Ready to ship ✓
                </p>
              </div>

              <Link
                to="/track-order"
                className="mt-4 self-start sm:self-end bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
              >
                Track Order
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
