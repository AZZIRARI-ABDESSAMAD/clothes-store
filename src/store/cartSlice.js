import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: loadCartFromStorage(),
    },
    reducers: {
        addToCart: (state, action) => {
            const { product, size } = action.payload;
            const existing = state.cartItems.find(
                (item) => item.id === product.id && item.size === size
            );
            if (existing) {
                existing.quantity += 1;
            } else {
                state.cartItems.push({ ...product, size, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const { id, size } = action.payload;
            state.cartItems = state.cartItems.filter(
                (item) => !(item.id === id && item.size === size)
            );
        },
        updateQuantity: (state, action) => {
            const { id, size, amount } = action.payload;
            const item = state.cartItems.find(
                (item) => item.id === id && item.size === size
            );
            if (item) {
                item.quantity = Math.max(1, item.quantity + amount);
            }
        },
    },
});

// Actions
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartTotal = (state) =>
    state.cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

export const selectCartCount = (state) =>
    state.cart.cartItems.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
