import { configureStore } from "@reduxjs/toolkit";
import productSlice from './ProductSlice'
import cartSlice from './CartSlice'
import orderSlice from './OrderSlice'
import authSlice from "./AuthSlice"

const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlice,
        order: orderSlice,
        auth: authSlice
    }
})

export default store;