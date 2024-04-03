import { configureStore } from "@reduxjs/toolkit";
import { filterSlice } from "./filter/filter-slice";
import { productSlice } from "./product/product-slice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    filter: filterSlice.reducer,
  },
});
