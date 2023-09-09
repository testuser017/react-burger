import { configureStore } from '@reduxjs/toolkit';
import { burgerIngredientsSlice } from './slices/burger-ingredients';
import { burgerConstructorSlice } from './slices/burger-constructor';
import { orderSlice } from './slices/order';
import { userSlice } from './slices/user';

export const store = configureStore({
  reducer: {
    [burgerIngredientsSlice.name]: burgerIngredientsSlice.reducer,
    [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production'
});
