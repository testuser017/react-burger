import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL_INGREDIENTS } from '../../utils/constants';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const getApiData = createAsyncThunk('burgerIngredients/getApiData', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(API_URL_INGREDIENTS);
    if(!res.ok) {
      throw Error(res.statusText);
    }
    return await res.json();
  } catch(error) {
    console.log(error);
    return rejectWithValue(error);
  };
});

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getApiData.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getApiData.fulfilled, (state, action) => {
        state.status = action.payload.success === true ? 'succeeded' : 'failed';
        state.data = action.payload.data;
      })
      .addCase(getApiData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    }
});

export default burgerIngredientsSlice.reducer;
