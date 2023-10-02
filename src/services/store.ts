import { configureStore } from '@reduxjs/toolkit';
import { burgerIngredientsSlice } from './slices/burger-ingredients';
import { burgerConstructorSlice } from './slices/burger-constructor';
import { orderSlice } from './slices/order';
import { orderInfoSlice } from './slices/order-info';
import { userSlice } from './slices/user';
import { wsDataSlice } from './slices/socket-data';
import { socketMiddleware } from './socket-middleware';

export const store = configureStore({
  reducer: {
    [burgerIngredientsSlice.name]: burgerIngredientsSlice.reducer,
    [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
    [orderInfoSlice.name]: orderInfoSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [wsDataSlice.name]: wsDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware()),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
