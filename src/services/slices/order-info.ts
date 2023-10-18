import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrderInfo } from '../../utils/api';
import { SliceActions, TResponseOrders } from '../../utils/types';

type TOrderInfoState = {
  data: null | TResponseOrders;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string | undefined;
};

export const initialState: TOrderInfoState = {
  data: null,
  status: 'idle',
  error: null,
};

export const loadOrderInfo = createAsyncThunk('orderInfo/loadOrderInfo', fetchOrderInfo);

export const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    emptyOrderInfo: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(loadOrderInfo.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loadOrderInfo.fulfilled, (state, action) => {
        state.status = action.payload.success === true ? 'succeeded' : 'failed';
        state.data = action.payload;
      })
      .addCase(loadOrderInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    }
});

export const { emptyOrderInfo } = orderInfoSlice.actions;

export default orderInfoSlice.reducer;

export type TOrderInfoActions = SliceActions<typeof orderInfoSlice.actions>;
