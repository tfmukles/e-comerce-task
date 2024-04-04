import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart/cart-slice";
import { filterSlice } from "./filter/filter-slice";
import { productSlice } from "./product/product-slice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    filter: filterSlice.reducer,
    cart: cartSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
