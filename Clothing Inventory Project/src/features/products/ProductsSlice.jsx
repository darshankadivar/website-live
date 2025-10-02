import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 API ka Base URL (apna MockAPI ya JSON-server URL dalna)
const BASE_URL = "https://68b294bac28940c9e69cd3c2.mockapi.io/products";

/* ===============================
   1. Async Thunks (API Calls)
================================*/

// 🔹 Sab products fetch karo
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
});

// 🔹 Naya product add karo
export const addProduct = createAsyncThunk("products/addProduct", async (product) => {
  const res = await axios.post(BASE_URL, product);
  return res.data;
});

// 🔹 Product update karo
export const updateProduct = createAsyncThunk("products/updateProduct", async (product) => {
  const res = await axios.put(`${BASE_URL}/${product.id}`, product);
  return res.data;
});

// 🔹 Product delete karo
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

// Stock update ke liye thunk
export const updateStock = createAsyncThunk(
  "products/updateStock",
  async ({ productId, variantIndex, sizeIndex, change }, { getState }) => {
    const state = getState().products.items;
    const product = state.find((p) => p.id === productId);

    if (!product) throw new Error("Product not found");

    // 🔹 Deep clone taaki original state mutate na ho
    const updatedProduct = JSON.parse(JSON.stringify(product));

    // stock update karo
    const currentStock = updatedProduct.variants[variantIndex].sizes[sizeIndex].stock;
    updatedProduct.variants[variantIndex].sizes[sizeIndex].stock = Math.max(
      0,
      currentStock + change
    );

    // API par update karo
    const res = await axios.put(`${BASE_URL}/${productId}`, updatedProduct);
    return res.data;
  }
);


/* ===============================
   2. Slice (Redux State + Reducers)
================================*/

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add Product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      })

      // Update Stock
.addCase(updateStock.fulfilled, (state, action) => {
  const index = state.items.findIndex((p) => p.id === action.payload.id);
  if (index !== -1) {
    state.items[index] = action.payload;
  }
})

  },
});

export default productsSlice.reducer;
