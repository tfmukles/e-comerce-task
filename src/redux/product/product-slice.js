import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getProducts } from "./product-api";

const productAdapter = createEntityAdapter({
  selectId: (product) => product.id,
});

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  error: "",
  ...productAdapter.getInitialState({
    isLoading: false,
    isError: false,
    error: "",
  }),
};

// async thunk
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const products = await getProducts();
    return products;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        productAdapter.setAll(state, action.payload.products);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export const productSelectors = productAdapter.getSelectors(
  (state) => state.products
);
