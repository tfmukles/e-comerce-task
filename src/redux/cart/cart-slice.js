import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (itemIndex === -1) {
        state.items = [...state.items, { ...action.payload, qty: 1 }];
      } else {
        state.items[itemIndex].qty += 1;
      }
    },

    removeFromCart: (state, action) => {
      console.log("removeFromCart", action.payload);
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },

    updateMany: (state, action) => {
      const pathItems = action.payload;
      state.items = state.items.map((item) => {
        const cart = pathItems.find((p) => p.productId === item.productId);
        if (cart) {
          return cart;
        } else {
          return item;
        }
      });
    },
  },
});

export const { addToCart, removeFromCart, updateMany } = cartSlice.actions;
