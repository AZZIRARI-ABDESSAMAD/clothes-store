import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

// Sync cart state to localStorage on every change
store.subscribe(() => {
    const { cartItems } = store.getState().cart;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
});

export default store;
