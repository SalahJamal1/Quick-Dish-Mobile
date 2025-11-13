import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiItem, ApiMenu } from "../../api/ApiMenu";

export type IItem = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  unitPrice: number;
  catagory: string;
};

type IState = {
  menu: IItem[];
  loader: boolean;
  error: string;
  item: IItem;
};

const initialState: IState = {
  menu: [],
  loader: false,
  error: "",
  item: {} as IItem,
};

export const fetchMenu = createAsyncThunk(
  "Menu/LOAD_MENU",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ApiMenu();
      return res.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Something is wrong when load The Data ");
    }
  }
);
export const fetchItem = createAsyncThunk(
  "Menu/LOAD_Item",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await ApiItem(id);
      return res.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Something is wrong when load The Data ");
    }
  }
);

export const menuSlice = createSlice({
  name: "Menu",
  initialState,
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(fetchMenu.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchMenu.fulfilled, (state, action: PayloadAction<any>) => {
        state.menu = action.payload;
        state.loader = false;
        state.error = "";
      })
      .addCase(fetchMenu.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Unkown Error";
        state.loader = false;
      })
      .addCase(fetchItem.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchItem.fulfilled, (state, action: PayloadAction<any>) => {
        state.item = action.payload;
        state.loader = false;
        state.error = "";
      })
      .addCase(fetchItem.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Unkown Error";
        state.loader = false;
      }),
});
