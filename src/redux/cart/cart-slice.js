import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items = action.payload.map((item) => ({
        productId: item.productId,
        qty: item.qty,
      }));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
