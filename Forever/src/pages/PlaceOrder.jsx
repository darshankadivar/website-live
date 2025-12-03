import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { assets } from "../assets/frontend_assets/assets";
import { addOrder } from "../redux/OrderSlice";


export default function PlaceOrder() {
    const navigate = useNavigate();
    const { products, totalPrice, totalQuantity } = useSelector((state) => state.cart);

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("");

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const placeOrder = () => {
        const user = JSON.parse(localStorage.getItem("user"))

        if (!isLoggedIn || !user?.email) {
            toast('Please Login or Register before placing an order.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            // navigate("/login");
            return;
        }

        if (!paymentMethod) {
            toast.warning('Please select a payment method.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        const orderData = {
            id: Date.now(),
            products,
            totalPrice,
            shipping: form,
            paymentMethod,
            date: new Date().toLocaleString(),
            status: "Pending"
        };

        dispatch(addOrder(orderData));

        const key = `orders_${user.email}`;

        const oldOrders = JSON.parse(localStorage.getItem(key)) || [];

        oldOrders.push(orderData);

        localStorage.setItem(key, JSON.stringify(oldOrders));

        toast.success('Order Placed Successfully', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });

        navigate(`/my-orders`)
    };


    return (
        <div className="p-4 md:p-10 border-t border-gray-400">

            <h3 className="text-xl uppercase font-medium mb-4"><span className="">Shipping</span> Information</h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input type="text" name="firstName" placeholder="First Name" required value={form.firstName} onChange={handleChange} className="w-full border p-3 rounded" />
                        <input type="text" name="lastName" placeholder="Last Name" required value={form.lastName} onChange={handleChange} className="w-full border p-3 rounded" />
                        <input type="email" name="email" placeholder="Email Address" required value={form.email} onChange={handleChange} className="w-full border p-3 rounded" />
                        <input type="number" name="phone" placeholder="Phone Number" required value={form.phone} onChange={handleChange} className="w-full border p-3 rounded" />
                        <input type="text" name="street" placeholder="Street Address" required value={form.street} onChange={handleChange} className="w-full border p-3 rounded" />
                        <input type="text" name="city" placeholder="City" required value={form.city} onChange={handleChange} className="w-full border p-3 rounded" />
                        <input type="text" name="state" placeholder="State" required value={form.state} onChange={handleChange} className="w-full border p-3 rounded" />
                        <input type="number" name="pincode" placeholder="Pincode" required value={form.pincode} onChange={handleChange} className="w-full border p-3 rounded" />
                        <input type="text" name="country" placeholder="Country" required value={form.country} onChange={handleChange} className="w-full border p-3 rounded" />

                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Payment Method</h3>

                    <div className="space-y-3">

                        <label className="flex items-center gap-3 p-3 border rounded opacity-60 cursor-not-allowed">
                            <input type="radio" disabled />
                            <img src={assets.stripe_logo} alt="stripe" className="w-10" />
                            Stripe (Coming Soon)
                        </label>

                        <label className="flex items-center gap-3 p-3 border rounded opacity-60 cursor-not-allowed">
                            <input type="radio" disabled />
                            <img src={assets.razorpay_logo} alt="razorpay" className="w-15" />
                            Razorpay (Coming Soon)
                        </label>

                        <label className="flex items-center gap-3 p-3 border rounded cursor-pointer">
                            <input
                                type="radio"
                                name="payment"
                                value="cod"
                                onChange={() => setPaymentMethod("cod")}
                            />
                            <img src="https://cdn-icons-png.flaticon.com/512/891/891462.png" alt="cod" className="w-8 h-8" />
                            Cash on Delivery
                        </label>

                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border h-fit">
                    <h3 className="text-xl  font-semibold mb-4 uppercase">Order Summary</h3>

                    <div className="space-y-2">
                        <p className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{totalPrice}</span>
                        </p>

                        <p className="flex justify-between">
                            <span>Shipping Fee</span>
                            <span className="text-green-600">Free</span>
                        </p>

                        <p className="flex justify-between font-semibold text-lg border-t pt-3 mt-2">
                            <span>Total</span>
                            <span>₹{totalPrice}</span>
                        </p>
                    </div>

                    <button
                        onClick={placeOrder}
                        className="w-full mt-6 bg-black text-white py-3 rounded-lg text-lg"
                    >
                        Place Order
                    </button>

                    <Link to="/collection" className="block text-center text-gray-600 mt-3 underline">
                        Continue Shopping
                    </Link>
                </div>

            </div>
        </div>
    );
}
