import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
};

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setIngredientData(state, action) {
      state.data = action.payload;
    },
    resetIngredientData(state) {
      state.data = {};
    }
  }
});

export const isNotEmptyIngredientData = state => !!Object.keys(state.ingredientDetails.data).length;

export const { setIngredientData, resetIngredientData } = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;
