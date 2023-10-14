import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchIngredients } from '../../utils/api';
import { SliceActions, TIngredient } from '../../utils/types';

type TBurgerIngredientsState = {
  data: TIngredient[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string | undefined;
}

export const initialState: TBurgerIngredientsState = {
  data: [],
  status: 'idle',
  error: null,
};

export const loadIngredients = createAsyncThunk('burgerIngredients/loadIngredients', fetchIngredients);

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadIngredients.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.status = action.payload.success === true ? 'succeeded' : 'failed';
        state.data = action.payload.data;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    }
});

export const getIngredients = (state: RootState) => state.burgerIngredients.data;

export default burgerIngredientsSlice.reducer;

export type TBurgerIngredientsActions = SliceActions<typeof burgerIngredientsSlice.actions>;
