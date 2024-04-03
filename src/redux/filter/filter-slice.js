import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchKey: "",
  itemsPerPage: 9,
  currentPage: 1,
  catagories: [],
};

export const filterSlice = createSlice({
  name: "products",
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
      state.catagories = action.payload;
    },
  },
});

export const { setSearchKey, setItemsPerPage, setCurrentPage, setCatagories } =
  filterSlice.actions;
