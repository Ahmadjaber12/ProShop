export const addDecimals=(num)=>{
    return (Math.round(num*100)/100).toFixed(2);
}

export const UpdateCart=(state)=>{
    state.itemsPrice=addDecimals(state.cartItems.reduce((acc,item)=>acc+item.price *item.qty,0));
                
    state.ShippingPrice=addDecimals(state.itemsPrice >100 ? 0 : 10);

    state.taxPrice=addDecimals(Number((state.itemsPrice * 0.15).toFixed(2)));

    state.totalPrice=(Number(state.itemsPrice) +Number(state.taxPrice)+Number(state.ShippingPrice)).toFixed(2);

    localStorage.setItem('cart',JSON.stringify( state))

    return state;
}