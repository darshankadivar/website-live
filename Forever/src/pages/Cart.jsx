import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeItem, clearCart } from "../redux/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, totalPrice, totalQuantity } = useSelector((state) => state.cart);

  return (
    <div className="p-4 md:p-10 border-t border-gray-300">
      <div className="flex items-center pb-3 mb-6 gap-3">
        <h2 className="text-2xl uppercase"><span className="text-gray-400">Your</span> Cart</h2>
        <p className="w-15 h-0.5 bg-gray-700 mx-auto md:mx-0"></p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium mb-4">Your Cart is Empty</h3>
          <Link to="/collection" className="bg-black text-white px-5 py-2 rounded-lg">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-4">
            {products.map((item,index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-4 p-4 border-y bg-white">

                <img src={item.image[0]} alt={item.name} className="w-24 h-24 object-cover rounded" />

                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>

                      <div className="mt-2 border rounded px-2 py-1 inline-block bg-gray-50 text-sm">
                        Size: <span className="font-semibold">{item.size}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-orange-600">₹{item.price}</p>
                      <button onClick={() => dispatch(removeItem({ id: item.id, size: item.size }))}
                        className="text-red-600 text-lg mt-1">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button onClick={() => dispatch(decreaseQuantity({ id: item.id, size: item.size }))}
                        className="px-3 py-1 bg-gray-100">-</button>
                      <div className="px-4">{item.quantity}</div>
                      <button onClick={() => dispatch(increaseQuantity({ id: item.id, size: item.size }))}
                        className="px-3 py-1 bg-gray-100">+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center">
              <button onClick={() => dispatch(clearCart())} className="text-red-600 underline">
                Clear Cart
              </button>
              <Link to="/collection" className="text-gray-600 underline">
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-5 shadow-md h-fit">
            <h4 className="font-semibold text-xl mb-4">Order Summary</h4>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="font-semibold">₹{totalPrice}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping Fee</span>
              <span className="text-green-600 font-semibold">Free</span>
            </div>

            <div className="flex justify-between text-lg font-bold border-t pt-4 mt-2">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={()=>navigate("/place-order")} className="w-full mt-6 bg-black text-white py-3 rounded-lg text-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
