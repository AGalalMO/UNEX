import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { i18n } from "next-i18next";
import axiosInstance from "../utils/axios/axiosInstance";
import { APIS } from "../utils/ServiceUrls";
// import { dispatch } from "./store";

const initialState = {
  cartList: [],
};

export const getCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { dispatch }) => {
    try {
      const locale = i18n.language;
      const response = await axiosInstance.get(APIS.CART.GET, {
        headers: {
          "accept-language": locale,
        },
        params: {
          token: localStorage.getItem("accessToken"),
        },
      });
      dispatch(cartSlice.actions.setCart(response.data));
      cartSlice.actions.setCart(cart);
    } catch (error) {
      console.log({ error });
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.cartList = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
