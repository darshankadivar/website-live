import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../features/orders/OrdersSlice";
import { updateStock } from "../features/products/ProductsSlice";

export default function OrderForm() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  // form states
  const [customerName, setCustomerName] = useState("");
  const [contact, setContact] = useState("");
  const [productId, setProductId] = useState("");
  const [variantIndex, setVariantIndex] = useState("");
  const [sizeIndex, setSizeIndex] = useState("");
  const [quantity, setQuantity] = useState("");

  // selected product + variant + size
  const selectedProduct = products.find((p) => p.id === productId);
  const selectedVariant =
    selectedProduct && variantIndex !== ""
      ? selectedProduct.variants[variantIndex]
      : null;
  const selectedSize =
    selectedVariant && sizeIndex !== ""
      ? selectedVariant.sizes[sizeIndex]
      : null;

  // total calculate
  const total = selectedProduct && quantity
    ? selectedProduct.price * quantity
    : 0;

const handleSubmit = (e) => {
  e.preventDefault();
  if (!customerName || !contact || !selectedProduct || !selectedVariant || !selectedSize) {
    return alert("All fields are required!");
  }

  if (quantity <= 0) {
    return alert("Quantity must be at least 1");
  }

  if (quantity > selectedSize.stock) {
    return alert("Not enough stock available!");
  }

  // 🟢 Save fixed date + time at creation
  const currentDateTime = new Date().toISOString(); 

  // new order object
  const newOrder = {
    customerName,
    contact,
    products: [
      {
        id: selectedProduct.id,
        name: selectedProduct.name,
        color: selectedVariant.color,
        size: selectedSize.size,
        price: selectedProduct.price,
        quantity,
      },
    ],
    total,
    status: "Pending",
    date: currentDateTime, // ✅ fixed timestamp
  };

  // 1) order save
  dispatch(addOrder(newOrder));

  // 2) stock reduce
  dispatch(
    updateStock({
      productId: selectedProduct.id,
      variantIndex,
      sizeIndex,
      change: -quantity,
    })
  );

  // reset form
  setCustomerName("");
  setContact("");
  setProductId("");
  setVariantIndex("");
  setSizeIndex("");
  setQuantity("");
};


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold  text-gray-800">
        Create New Order
      </h2>

      {/* Customer Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Customer Name
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          placeholder="Enter customer name"
        />
      </div>

      {/* Contact */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Contact
        </label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          placeholder="Phone or Email"
        />
      </div>

      {/* Product Select */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Select Product
        </label>
        <select
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value);
            setVariantIndex("");
            setSizeIndex("");
          }}
          className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
        >
          <option value="">-- Choose Product --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - ₹{p.price}
            </option>
          ))}
        </select>
      </div>

      {/* Variant Select (Color) */}
      {selectedProduct && (
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Select Color
          </label>
          <select
            value={variantIndex}
            onChange={(e) => {
              setVariantIndex(e.target.value);
              setSizeIndex("");
            }}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">-- Choose Color --</option>
            {selectedProduct.variants.map((v, idx) => (
              <option key={idx} value={idx}>
                {v.color}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Size Select */}
      {selectedVariant && (
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Select Size
          </label>
          <select
            value={sizeIndex}
            onChange={(e) => setSizeIndex(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">-- Choose Size --</option>
            {selectedVariant.sizes.map((s, idx) => (
              <option key={idx} value={idx}>
                {s.size} (Stock: {s.stock})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Quantity */}
      {selectedSize && (
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            max={selectedSize.stock}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>
      )}

      {/* Total */}
      <div className="text-lg font-semibold text-gray-800">
        Total: ₹{total}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add Order
      </button>
    </form>
  );
}
