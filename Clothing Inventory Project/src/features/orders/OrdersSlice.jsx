import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 MockAPI Orders ka Base URL (apna URL dalna)
const BASE_URL = "https://68b294bac28940c9e69cd3c2.mockapi.io/orders";

/* ===============================
   1. Async Thunks (API Calls)
================================*/

// 🔹 Sab orders fetch karo
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
});

// 🔹 Naya order add karo
export const addOrder = createAsyncThunk("orders/addOrder", async (order) => {
  const res = await axios.post(BASE_URL, order);
  return res.data;
});

// 🔹 Order update karo (status change ya items update)
export const updateOrder = createAsyncThunk("orders/updateOrder", async (order) => {
  const res = await axios.put(`${BASE_URL}/${order.id}`, order);
  return res.data;
});

// 🔹 Order delete karo
export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

/* ===============================
   2. Slice (Redux State + Reducers)
================================*/

const OrdersSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],      // saare orders
    loading: false, // loading spinner ke liye
    error: null,    // error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add Order
      .addCase(addOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update Order
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.items.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter((o) => o.id !== action.payload);
      });
  },
});

export default OrdersSlice.reducer;
