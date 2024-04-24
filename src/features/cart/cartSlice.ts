import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CartItemType = {
  product_id: string;
  productName: string;
  stock: number;
  quantity: number;
  url: string;
  price: number;
  store_id: string;
};

type CartStateType = {
  items: CartItemType[];
  totalPrice: number;
};

const initialState: CartStateType = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const newItem = action.payload;
      state.items = [...state.items, newItem];
      state.totalPrice += state.totalPrice + newItem.quantity;
    },
    increaseItems(state, action: PayloadAction<string>) {
      const prodcut_id = action.payload;
      const item = state.items.find((item) => item.product_id === prodcut_id);
      if (item) {
        item.quantity++;
        state.totalPrice += item.price;
      }
    },
    decreaseItems(state, action: PayloadAction<string>) {
      const prodcut_id = action.payload;
      const item = state.items.find((item) => item.product_id === prodcut_id);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalPrice -= item.price;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, increaseItems, decreaseItems, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getCartItem = (product_id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.product_id === product_id);
