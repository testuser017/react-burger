import { createSlice } from "@reduxjs/toolkit";
import { TResponseOrders } from "../../utils/types";

type TWsDataState = {
  data: null | TResponseOrders;
};

const initialState: TWsDataState = {
  data: null,
};

export const wsDataSlice = createSlice({
  name: 'wsData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    wsStub: (state, action) => {
      // console.log(action.payload);
    },
  },
});

export const { setData, wsStub } = wsDataSlice.actions;

export default wsDataSlice.reducer;
