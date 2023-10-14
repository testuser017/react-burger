import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrder } from '../../utils/api';
import { SliceActions, TResponseOrder } from '../../utils/types';

type TOrderState = {
  data: null | TResponseOrder;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string | undefined;
};

export const initialState: TOrderState = {
  data: null,
  status: 'idle',
  error: null,
};

export const requestOrder = createAsyncThunk('order/requestOrder', fetchOrder);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    emptyOrder: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(requestOrder.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(requestOrder.fulfilled, (state, action) => {
        state.status = action.payload.success === true ? 'succeeded' : 'failed';
        state.data = action.payload;
      })
      .addCase(requestOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    }
});

export const { emptyOrder } = orderSlice.actions;

export default orderSlice.reducer;

export type TOrderActions = SliceActions<typeof orderSlice.actions>;
