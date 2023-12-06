import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState: ProductState = {
  cart: [],
  total: 0,
  discount: 0,
};

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    ADD_PRODUCTS_TO_CART: (state, action: PayloadAction<Cart>) => {
      const item: any = state.cart.find(
        (el) => el.id === action.payload.id
      );
      if (item) {
        toast.warning("Product already in cart.");
        return;
      }
      state.cart.push({ ...action?.payload, quantity: 1 });
      const discount =
        (action?.payload?.discountPercentage / 100) * action?.payload?.price;
      state.discount += discount;
      state.total += action?.payload?.price - discount;

      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      localStorage.setItem("discount", JSON.stringify(state.discount));
      localStorage.setItem("total", JSON.stringify(state.total));
      toast.success("Product added successfully.");
    },

    ADD_PERSISITED_DATA: (
      state,
      action: PayloadAction<{ cart: Cart[]; discount: string; total: string }>
    ) => {
      state.cart.push(...action.payload.cart);
      state.total = Number(action.payload.total) ?? 0;
      state.discount = Number(action.payload.discount) ?? 0;
    },

    REMOVE_PRODUCTS_FROM_CART: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      const item: any = state.cart.find((el) => el.id === action.payload.id);
      const discount =
        (item.discountPercentage / 100) * item?.price * item.quantity;
      const totalPrice = (item?.price - discount) * item.quantity;
      state.discount -= discount;
      state.total -= totalPrice;

      const data = state.cart.filter((el) => el.id != action.payload?.id);
      state.cart = data;
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("discount", JSON.stringify(state.discount));
      toast.success("Product removed successfully.");
    },

    INCREASE_QUANTITY: (state, action: PayloadAction<{ id: number }>) => {
      let index = 0;
      const item: any = state.cart.find((el, indx) => {
        index = indx;
        return el.id === action.payload.id;
      });
      const data = state.cart.filter((el) => el.id != action.payload?.id);
      state.cart = data;
      item.quantity += 1;
      item.stock -= 1;
      state.cart.splice(index, 0, item);

      const discount = (item?.discountPercentage / 100) * item?.price;
      state.discount += discount;
      state.total += item?.price - discount;

      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      localStorage.setItem("discount", JSON.stringify(state.discount));
      localStorage.setItem("total", JSON.stringify(state.total));
    },

    DECREASE_QUANTITY: (state, action: PayloadAction<{ id: number }>) => {
      let index = 0;
      const item: any = state.cart.find((el, indx) => {
        index = indx;
        return el.id === action.payload.id;
      });
      const data = state.cart.filter((el) => el.id != action.payload?.id);
      state.cart = data;
      item.quantity -= 1;
      item.stock += 1;
      state.cart.splice(index, 0, item);

      const discount = (item?.discountPercentage / 100) * item?.price;

      state.discount -= discount;
      state.total -= item?.price - discount;

      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      localStorage.setItem("discount", JSON.stringify(state.discount));
      localStorage.setItem("total", JSON.stringify(state.total));
    },
  },
});

export const {
  ADD_PRODUCTS_TO_CART,
  ADD_PERSISITED_DATA,
  REMOVE_PRODUCTS_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} = ProductSlice.actions;

export default ProductSlice.reducer;
