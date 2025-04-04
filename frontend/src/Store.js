import {configureStore} from "@reduxjs/toolkit"
import { apiSlice } from "./Slice/apiSlice.js";
import cartSliceReducer from './Slice/apiCartSlice.js'
import authSliceReducer from './Slice/apiAuthSlice.js'
const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        cart:cartSliceReducer,
        auth:authSliceReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})
export default store;