import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ICart = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
};
type IState = {
  cart: ICart[];
};

const initialState: IState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    AddItem(state, action: PayloadAction<ICart>) {
      state.cart.push(action.payload);
    },
    IncItem(state, action: PayloadAction<string>) {
      let item = state.cart.find((c) => c.id === action.payload);
      if (!item) return;
      item!.quantity++;
      item!.totalPrice = item!.quantity * item!.unitPrice;
    },
    DecItem(state, action: PayloadAction<string>) {
      let item = state.cart.find((c) => c.id === action.payload);
      if (!item) return;
      item!.quantity--;
      item!.totalPrice = item!.quantity * item!.unitPrice;
      if (item!.quantity <= 0) cartSlice.caseReducers.DeletItem(state, action);
    },
    DeletItem(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((c) => c.id !== action.payload);
    },
    ClearItem(state) {
      state.cart = [];
    },
  },
});

export const { AddItem, IncItem, DecItem, DeletItem, ClearItem } =
  cartSlice.actions;
