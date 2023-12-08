import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IDebitNote, TProduct } from "../../utils/validation";
import { IStore } from "../../types";

const initialState: IStore = {
  products: [],
  debitNotes: [],
};

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    ADD_PRODUCTS: (state, action: PayloadAction<TProduct>) => {
      state.products.push({ ...action?.payload });
      localStorage.setItem("products", JSON.stringify(state.products));

      toast.success("New product added successfully.");
    },

    ADD_DEBIT_NOTE: (state, action: PayloadAction<IDebitNote>) => {
      state.debitNotes.push({ ...action?.payload });
      localStorage.setItem("debitNotes", JSON.stringify(state.debitNotes));

      toast.success("New debit-note added successfully.");
    },

    ADD_PERSISITED_DATA: (state, action: PayloadAction<IStore>) => {
      action.payload.products?.length &&
        state.products.push(...action.payload.products);
      action.payload.debitNotes?.length &&
        state.debitNotes.push(...action.payload.debitNotes);
    },
  },
});

export const { ADD_PERSISITED_DATA, ADD_PRODUCTS, ADD_DEBIT_NOTE } =
  ProductSlice.actions;

export default ProductSlice.reducer;
