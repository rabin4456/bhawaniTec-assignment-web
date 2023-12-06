import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./features/products/productsSlice";

export const store = configureStore({
  reducer: { ProductReducer },
});
