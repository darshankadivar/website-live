import { createSlice } from "@reduxjs/toolkit";

const getUserId = () => localStorage.getItem("userId");  // 👉 jab user login ho

const loadOrders = () => {
  const userId = getUserId();
  if (!userId) return [];
  return JSON.parse(localStorage.getItem(`orders_${userId}`)) || [];
};

const saveOrders = (orders) => {
  const userId = getUserId();
  if (!userId) return;
  localStorage.setItem(`orders_${userId}`, JSON.stringify(orders));
};

const initialState = {
  orders: loadOrders(),
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      saveOrders(state.orders);
    },

    clearOrders: (state) => {
      const userId = getUserId();
      state.orders = [];
      if (userId) {
        localStorage.removeItem(`orders_${userId}`);
      }
    },
  },
});

export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
