import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    name: "Ball",
    quantity: 1,
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"]
  }],
 totalAmount: 0
};

const calculateTotalAmount = (state) => {
  state.totalAmount = state.items.reduce((total, item) => total + item.priceCents * item.quantity, 0);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart (state, action) {
      const products = action.payload;
      const findProduct = state.items.find(item => item.id === products.id);

      if (findProduct) {
        findProduct.quantity += 1;
      } else {
        state.items.push({
          ...products,
          quantity: 1,
        })
      }
      calculateTotalAmount(state);
    },
    reduceQuantity (state, action) {
      const reduceId = action.payload;
      const findProduct = state.items.find(item => item.id === reduceId);

      if (findProduct.quantity > 1) {
        findProduct.quantity -= 1;
      } else {
        state.items = state.items.filter(item => item.id !== reduceId);
      }
      calculateTotalAmount(state);
    },
    increaseQuantity (state, action) {
      const increaseId = action.payload;
      const findProduct = state.items.find(item => item.id === increaseId);

      if (findProduct) {
        findProduct.quantity += 1;
      }
      calculateTotalAmount(state);
    },
    removeFromCart (state, action) {
      const removeId = action.payload;
      state.items = state.items.filter(item => item.id !== removeId);
      calculateTotalAmount(state);
    },

    clearCart (state) {
      state.items = [];
      calculateTotalAmount(state);
    }
}})

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export const { addToCart, removeFromCart, clearCart, increaseQuantity, reduceQuantity } = cartSlice.actions;
export default cartSlice.reducer

