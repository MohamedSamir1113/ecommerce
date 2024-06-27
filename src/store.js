import { configureStore } from "@reduxjs/toolkit";
import registerReducer from"./pages/Register/registerSlice"
import loginReducer from"./pages/Login/loginSlice"
import cartReducer from"./components/Cart/cartSlice"
export const store = configureStore({
    reducer:{registerReducer,loginReducer,cartReducer}
})