import { useState, useEffect } from "react";

export default function ProductForm({ onSave, editing }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    supplier: "",
    variants: [
      {
        color: "",
        sizes: [{ size: "", stock: 0 }],
      },
    ],
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleColorChange = (index, value) => {
    const newVariants = [...form.variants];
    newVariants[index].color = value;
    setForm({ ...form, variants: newVariants });
  };

  const handleSizeChange = (variantIdx, sizeIdx, field, value) => {
    const newVariants = [...form.variants];
    newVariants[variantIdx].sizes[sizeIdx][field] = value;
    setForm({ ...form, variants: newVariants });
  };

  const addColorField = () => {
    setForm({
      ...form,
      variants: [
        ...form.variants,
        { color: "", sizes: [{ size: "", stock: 0 }] },
      ],
    });
  };

  const addSizeField = (variantIdx) => {
    const newVariants = [...form.variants];
    newVariants[variantIdx].sizes.push({ size: "", stock: 0 });
    setForm({ ...form, variants: newVariants });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      name: "",
      category: "",
      price: "",
      supplier: "",
      variants: [{ color: "", sizes: [{ size: "", stock: 0 }] }],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 md:p-6 rounded-2xl shadow-md mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 rounded"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
        />
        <input
          name="supplier"
          value={form.supplier}
          onChange={handleChange}
          placeholder="Supplier"
          className="border p-2 rounded"
        />
      </div>

      {/* Variants */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Colors & Sizes</h3>
        {form.variants.map((variant, vIdx) => (
          <div key={vIdx} className="border p-3 mb-3 rounded-lg bg-gray-50">
            <input
              value={variant.color}
              onChange={(e) => handleColorChange(vIdx, e.target.value)}
              placeholder="Color (e.g., Black)"
              className="border p-2 rounded w-full md:w-1/3 mb-2"
            />
            {variant.sizes.map((s, sIdx) => (
              <div
                key={sIdx}
                className="flex flex-col md:flex-row gap-2 mb-2"
              >
                <input
                  value={s.size}
                  onChange={(e) =>
                    handleSizeChange(vIdx, sIdx, "size", e.target.value)
                  }
                  placeholder="Size (e.g., M)"
                  className="border p-2 rounded w-full md:w-1/3"
                />
                <input
                  type="number"
                  value={s.stock}
                  onChange={(e) =>
                    handleSizeChange(vIdx, sIdx, "stock", e.target.value)
                  }
                  placeholder="Stock"
                  className="border p-2 rounded w-full md:w-1/3"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addSizeField(vIdx)}
              className="bg-green-500 text-white px-3 py-1 rounded mt-1"
            >
              + Add Size
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addColorField}
          className="bg-purple-500 text-white px-3 py-1 rounded"
        >
          + Add Color
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4 w-full md:w-auto"
      >
        {editing ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
