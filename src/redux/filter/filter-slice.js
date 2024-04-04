import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchKey: "",
  itemsPerPage: 9,
  currentPage: 1,
  catagories: [],
  brands: [],
  range: {
    min: 0,
    max: 0,
  },
  rating: 5,
  sort: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCatagories: (state, action) => {
      const isInclude = state.catagories.includes(action.payload);
      if (isInclude) {
        state.catagories = state.catagories.filter(
          (item) => item !== action.payload
        );
      } else {
        state.catagories.push(action.payload);
      }
    },
    setBrands: (state, action) => {
      const isInclude = state.brands.includes(action.payload);
      if (isInclude) {
        state.brands = state.brands.filter((item) => item !== action.payload);
      } else {
        state.brands.push(action.payload);
      }
    },
    setRange: (state, action) => {
      state.range = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const {
  setSearchKey,
  setItemsPerPage,
  setCurrentPage,
  setCatagories,
  setRange,
  setBrands,
  setRating,
  setSort,
} = filterSlice.actions;
