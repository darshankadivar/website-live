import { createSlice } from "@reduxjs/toolkit";

const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || []
const savedTotalQuantity = JSON.parse(localStorage.getItem("cartTotalQuantity")) || 0
const savedTotalPrice = JSON.parse(localStorage.getItem("cartTotalPrice")) || 0

const initialState = {
    products: savedCartItems,
    totalQuantity: savedTotalQuantity,
    totalPrice: savedTotalPrice
}

const saveLocal = (state) => {
    localStorage.setItem("cartItems", JSON.stringify(state.products))
    localStorage.setItem("cartTotalQuantity", JSON.stringify(state.totalQuantity))
    localStorage.setItem("cartTotalPrice", JSON.stringify(state.totalPrice))
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart:(state,action)=>{
            const newItem = action.payload
            const existingItem = state.products.find((item)=>item.id === newItem.id && item.size === newItem.size)

            if(existingItem){
                existingItem.quantity += 1
                existingItem.totalPrice += newItem.price
            }else {
               state.products.push({
                id: newItem.id,
                name: newItem.name,
                price: newItem.price,
                size: newItem.size,
                quantity: 1,
                totalPrice: newItem.price,
                image: newItem.image
               }) 
            }

            state.totalQuantity += 1
            state.totalPrice += newItem.price
            saveLocal(state)
        },

        increaseQuantity: (state, action)=>{
            const {id, size} = action.payload
            const item = state.products.find((i) => i.id === id && i.size === size)
            if (!item) return
            item.quantity += 1
            item.totalPrice += item.price
            state.totalQuantity += 1
            state.totalPrice += item.price
            saveLocal(state)
        },

        decreaseQuantity: (state, action) => {
            const {id, size} = action.payload
            const item = state.products.find((i) => i.id === id && i.size === size)
            if (!item) return
            if (item.quantity === 1) {
                state.products = state.products.filter((i) => !(i.id === id && i.size === size))
                state.totalQuantity -= 1
                state.totalPrice -= item.price
            } else {
                item.quantity -= 1
                item.totalPrice -= item.price
                state.totalQuantity -= 1
                state.totalPrice -= item.price
            }
            saveLocal(state)
        },

        removeItem: (state, action) => {
            const {id, size} = action.payload
            const item = state.products.find((i) => i.id === id && i.size === size)
            if (!item) return
            state.totalQuantity -= item.quantity
            state.totalPrice -= item.totalPrice
            state.products = state.products.filter((i) => !(i.id === id && i.size === size))
            saveLocal(state)
        }, 

        clearCart: (state) => {
            state.products = []
            state.totalQuantity = 0
            state.totalPrice = 0
            localStorage.removeItem("cartItems")
            localStorage.removeItem("cartTotalQuantity")
            localStorage.removeItem("cartTotalPrice")
        }
    }
})

export const {addToCart, increaseQuantity, decreaseQuantity, removeItem, clearCart} = cartSlice.actions
export default cartSlice.reducer