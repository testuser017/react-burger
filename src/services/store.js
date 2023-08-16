import { configureStore } from '@reduxjs/toolkit';
import { burgerIngredientsSlice } from './slices/burger-ingredients';
import { ingredientDetailsSlice } from './slices/ingredient-details';
import { burgerConstructorSlice } from './slices/burger-constructor';
import { orderSlice } from './slices/order';

export const store = configureStore({
  reducer: {
    [burgerIngredientsSlice.name]: burgerIngredientsSlice.reducer,
    [ingredientDetailsSlice.name]: ingredientDetailsSlice.reducer,
    [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production'
});
