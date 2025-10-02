import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../features/products/ProductsSlice";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

export default function Products() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [editing, setEditing] = useState(null);

  // 🔹 Filter/Search/Sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(""); 

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSave = (product) => {
    if (editing) {
      dispatch(updateProduct(product));
      setEditing(null);
    } else {
      dispatch(addProduct(product));
    }
  };

  const handleEdit = (product) => {
    setEditing(product);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  // 🔹 Filter + Search + Sort logic
  let filteredItems = items
    .filter((p) =>p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Products Management
      </h2>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* ========== Filter/Search/Sort UI ========== */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-40"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded w-40"
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>
      </div>

      <ProductForm onSave={handleSave} editing={editing} />
      <ProductList
        products={filteredItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
