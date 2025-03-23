import { createSlice } from "@reduxjs/toolkit";
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: {},
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProducts, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;