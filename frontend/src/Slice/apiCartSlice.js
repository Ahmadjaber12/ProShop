import { createSlice } from "@reduxjs/toolkit";
import { UpdateCart } from "../utils/cartUtils";

const initialState=localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) :
 {cartItems:[],shippingAddress:{},paymentMethod:'PayPal'}


const cartSlice= createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
                const item=action.payload;

                const existItem=state.cartItems.find(x=>x._id===item._id);

                if(existItem){
                    state.cartItems=state.cartItems.map(x=>x._id === existItem._id ? item : x)
                }
                else {
                    state.cartItems=[...state.cartItems,item]
                }
                // calculate the prices
               return UpdateCart(state);


        },
        removeFromCart:(state,action)=>{
            const id=action.payload;
            state.cartItems=state.cartItems.filter(x=>x._id !== id);
            
            return UpdateCart(state);
        },
        saveShippingAddress:(state,action)=>{
            state.shippingAddress=action.payload;
            return UpdateCart(state);
        },
        savePaymentMethod:(state,action)=>{
            state.paymentMethod=action.payload;
            return UpdateCart(state);
        },
        clearCartItems:(state,action)=>{
            state.cartItems=[];
            return UpdateCart(state);
        }
    }
})
export const {addToCart,removeFromCart,saveShippingAddress,savePaymentMethod,clearCartItems}=cartSlice.actions;
export default cartSlice.reducer;
