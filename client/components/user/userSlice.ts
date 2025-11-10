import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "../cart/cartSlice";

export type IOrder = {
  id: string;
  orderPrice: number;
  status: number;
  estimatedDelivery: string;
  createdAt: string;
  actualDelivery: string;
  carts: [
    {
      id: number;
      quantity: number;
      totalPrice: number;
      item: ICart;
    }
  ];
};
export type IError = {
  firstName: string;
  lastName: string;
  email: string;
  Address: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
};
export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  Address: string;
  phoneNumber: string;
  password: string;
  passwordConfirm?: string;
  order?: IOrder[];
};
type IState = {
  user: IUser;
  Auth: boolean;
  err: IError | string;
};

export type IAction = {
  type:
    | "ERROR_EMAIL"
    | "ERROR_PASSWORD"
    | "ERROR_PASSWORDCONFIRM"
    | "ERROR_FIRSTNAME"
    | "ERROR_LASTNAME"
    | "ERROR_PHONENUMBER"
    | "ERROR_ADDRESS"
    | "CLEARE_ERROR";
  value: string;
};

const initialState: IState = {
  user: {} as IUser,
  Auth: false,
  err: "",
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    User_Login(state, action) {
      state.user = action.payload;
      state.Auth = true;
    },
    User_ERORR(state: IState, action: PayloadAction<IAction>) {
      switch (action.payload.type) {
        case "ERROR_EMAIL":
          return {
            ...state,
            err: { ...(state.err as IError), email: action.payload.value },
          };
        case "ERROR_PASSWORD":
          return {
            ...state,
            err: { ...(state.err as IError), password: action.payload.value },
          };
        case "ERROR_ADDRESS":
          return {
            ...state,
            err: { ...(state.err as IError), Address: action.payload.value },
          };
        case "ERROR_FIRSTNAME":
          return {
            ...state,
            err: { ...(state.err as IError), firstName: action.payload.value },
          };
        case "ERROR_LASTNAME":
          return {
            ...state,
            err: { ...(state.err as IError), lastName: action.payload.value },
          };
        case "ERROR_PHONENUMBER":
          return {
            ...state,
            err: {
              ...(state.err as IError),
              phoneNumber: action.payload.value,
            },
          };
        case "ERROR_PASSWORDCONFIRM":
          return {
            ...state,
            err: {
              ...(state.err as IError),
              passwordConfirm: action.payload.value,
            },
          };
        case "CLEARE_ERROR":
          state.err = {} as IError;
          break;
        default:
          return state;
      }
    },
    User_Logout(state) {
      state.user = {} as IUser;
      state.Auth = false;
    },
    User_Load(state, action) {
      state.user = action.payload;
      state.Auth = true;
    },
  },
});

export const { User_Login, User_Logout, User_ERORR, User_Load } =
  userSlice.actions;
