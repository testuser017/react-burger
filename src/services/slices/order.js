import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL_ORDERS } from '../../utils/constants';

const initialState = {
  dataResponse: null,
  status: 'idle',
  error: null,
};

export const orderRequest = createAsyncThunk('order/orderRequest', async (ingredientIdList, { rejectWithValue }) => {
  try {
    const res = await fetch(API_URL_ORDERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        'ingredients': ingredientIdList
      })
    });
    if(!res.ok) {
      throw Error(res.statusText);
    }
    return await res.json();
  } catch(error) {
    console.log(error);
    return rejectWithValue(error);
  };
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(orderRequest.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(orderRequest.fulfilled, (state, action) => {
        state.status = action.payload.success === true ? 'succeeded' : 'failed';
        state.dataResponse = action.payload;
      })
      .addCase(orderRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    }
});

export default orderSlice.reducer;
