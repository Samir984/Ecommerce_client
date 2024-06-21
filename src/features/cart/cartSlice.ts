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

const storeCartStateInLocalStorage = (state: CartStateType) => {
  localStorage.setItem("cartState", JSON.stringify(state));
};

const loadStateFromLocalStorage = (): CartStateType => {
  const storedState = localStorage.getItem("cartState");
  return storedState ? JSON.parse(storedState) : initialState;
};

const persistedState = loadStateFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState: persistedState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const newItem = action.payload;
      state.items.push(newItem);
      state.totalPrice += newItem.price * newItem.quantity;
      storeCartStateInLocalStorage(state);
    },
    deleteItem(state, action: PayloadAction<string>) {
      const productIdToDelete = action.payload;
      const itemToDelete = state.items.find(
        (item) => item.product_id === productIdToDelete
      );
      if (itemToDelete) {
        state.totalPrice -= itemToDelete.price * itemToDelete.quantity;
        state.items = state.items.filter(
          (item) => item.product_id !== productIdToDelete
        );
        storeCartStateInLocalStorage(state);
      }
    },
    increaseItems(state, action: PayloadAction<string>) {
      const product_id = action.payload;
      const item = state.items.find((item) => item.product_id === product_id);
      if (item && item.quantity < item.stock) {
        item.quantity++;
        state.totalPrice += item.price;
        storeCartStateInLocalStorage(state);
      }
    },
    decreaseItems(state, action: PayloadAction<string>) {
      const product_id = action.payload;
      const item = state.items.find((item) => item.product_id === product_id);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalPrice -= item.price;
        storeCartStateInLocalStorage(state);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      storeCartStateInLocalStorage(state);
    },
  },
});

export const { addItem, increaseItems, decreaseItems, clearCart, deleteItem } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getCartItem = (product_id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.product_id === product_id);

export const getAllCartItems = (state: RootState) => state.cart.items;
