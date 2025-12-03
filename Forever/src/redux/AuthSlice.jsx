import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user")) || null

const initialState = {
    user: savedUser,
    isLoggedIn: savedUser ? true : false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        registerUser: (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true
            localStorage.setItem("user", JSON.stringify(action.payload))
             localStorage.setItem("isLoggedIn", "true")
        },

        loginUser: (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true
            localStorage.setItem("user", JSON.stringify(action.payload))
             localStorage.setItem("isLoggedIn", "true")
        },

        logoutUser: (state) => {
            state.user = null
            state.isLoggedIn = false
            localStorage.removeItem("user")
             localStorage.setItem("isLoggedIn", "false")
        }
    }
})

export const {registerUser, loginUser, logoutUser} = authSlice.actions
export default authSlice.reducer
