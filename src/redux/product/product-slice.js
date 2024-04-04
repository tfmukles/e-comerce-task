import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { removeFromCart } from "../cart/cart-slice";
import { getProducts } from "./product-api";

export const productAdapter = createEntityAdapter({
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
  reducers: {
    productsUpdate: (state, action) => {
      productAdapter.updateMany(
        state,
        action.payload.map((item) => {
          return {
            id: item.productId,
            changes: {
              stock:
                state.entities[item.productId].stock -
                (item.diffQty || item.qty),
            },
          };
        })
      );
    },
  },
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
      })
      .addCase(removeFromCart, (state, action) => {
        productAdapter.updateOne(state, {
          id: action.payload.productId,
          changes: {
            stock:
              state.entities[action.payload.productId].stock +
              action.payload.qty,
          },
        });
      });
  },
});

export const productSelectors = productAdapter.getSelectors(
  (state) => state.product
);

export const { productsUpdate } = productSlice.actions;
