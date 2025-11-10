import { configureStore } from "@reduxjs/toolkit";
import { menuSlice } from "../components/menu/menuSlice";
import { cartSlice } from "../components/cart/cartSlice";
import { userSlice } from "../components/user/userSlice";

export const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});

export type IState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
