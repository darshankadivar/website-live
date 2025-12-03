import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Myorder() {
    const { orders } = useSelector((state) => state.order);

    if (!orders || orders.length === 0) {
        return (
            <div className="p-8 flex justify-center items-center">
                <p className="text-gray-500 text-lg">No orders found 😕</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 max-w-5xl mx-auto">

            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 border-b pb-3">
                My Orders
            </h2>

            <div className="flex flex-col gap-4">
                {orders.map((order) => {

                
                    const items = order.products || [];

                    return (
                        <div
                            key={order.id}
                            className="border rounded-xl p-4 sm:p-5 shadow-sm bg-white hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                        >

                           
                            <div className="mb-3 sm:mb-0">
                                <p className="font-semibold text-lg">
                                    Order #{order.id}
                                </p>

                                <p className="text-gray-500 text-sm mt-1">
                                    {order.date}
                                </p>

                                <p className="text-green-600 text-sm font-medium mt-1">
                                    Status: Pending
                                </p>
                            </div>

                           
                            <div className="text-right">
                                <p className="font-bold text-xl mb-1">
                                    ₹{order.totalPrice}
                                </p>

                                <p className="text-gray-500 text-sm">
                                    {items.length} items
                                </p>

                                <Link
                                    to={`/order/${order.id}`}
                                    className="mt-3 inline-block bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
                                >
                                    View Details
                                </Link>
                            </div>

                        </div>
                    );
                })}
            </div>

        </div>
    );
}
