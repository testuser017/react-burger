import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_INGREDIENTS } from '../../utils/constants';
import { TIngredient } from '../../utils/types';
import { RootState } from '../store';

type TBurgerIngredientsState = {
  data: TIngredient[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // enum ??
  error: null | string | undefined;
}

const initialState: TBurgerIngredientsState = {
  data: [],
  status: 'idle',
  error: null,
};

export const getApiData = createAsyncThunk('burgerIngredients/getApiData', async (_, { rejectWithValue }) => {
  try {
    // TODO: move fetch to API file
    const res = await fetch(API_URL_INGREDIENTS);
    if(!res.ok) {
      throw Error(res.statusText);
    }
    return await res.json(); // await ??
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

export const getIngredientsData = (state: RootState) => state.burgerIngredients.data;

export default burgerIngredientsSlice.reducer;
