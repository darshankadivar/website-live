import { useDispatch } from "react-redux";
import { updateStock } from "../features/products/ProductsSlice";

export default function ProductList({ products, onEdit, onDelete }) {
  const dispatch = useDispatch();

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow rounded-lg text-sm md:text-base">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Price</th>
            <th className="p-2">Supplier</th>
            <th className="p-2">Variants (with Stock)</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2">₹{p.price}</td>
              <td className="p-2">{p.supplier}</td>

              {/* 🔹 Variants with Stock Update */}
              <td className="p-2">
                {p.variants?.map((v, vIdx) => (
                  <div key={vIdx} className="mb-1">
                    <span className="font-semibold">{v.color}:</span>{" "}
                    {v.sizes.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1 mr-3"
                      >
                        {s.size} (
                        <span
                          className={`${
                            s.stock <= 5
                              ? "text-red-500 font-bold"
                              : "text-gray-700"
                          }`}
                        >
                          {s.stock}
                        </span>
                        )
                        {/* + Button */}
                        
                        <button
                          onClick={() =>
                            dispatch(
                              updateStock({
                                productId: p.id,
                                variantIndex: vIdx,
                                sizeIndex: sIdx,
                                change: 1,
                              })
                            )
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-0.5 rounded text-xs"
                        >
                          +
                        </button>
                        {/* - Button */}
                        <button
                          onClick={() =>
                            dispatch(
                              updateStock({
                                productId: p.id,
                                variantIndex: vIdx,
                                sizeIndex: sIdx,
                                change: -1,
                              })
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 rounded text-xs"
                        >
                          –
                        </button>
                      </span>
                    ))}
                  </div>
                ))}
              </td>

              {/* 🔹 Edit / Delete Actions */}
              <td className="p-2 text-center">
                <button
                  onClick={() => onEdit(p)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p.id)}
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
