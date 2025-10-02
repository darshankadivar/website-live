import { configureStore } from "@reduxjs/toolkit";
import  productsSlice  from "../features/products/ProductsSlice";
import  OrdersSlice  from "../features/orders/OrdersSlice";


export const store = configureStore({
    reducer:{
        products: productsSlice,
        orders: OrdersSlice
    }
})