import { configureStore } from '@reduxjs/toolkit';
import { TBurgerConstructorActions, burgerConstructorSlice } from './slices/burger-constructor';
import { TBurgerIngredientsActions, burgerIngredientsSlice } from './slices/burger-ingredients';
import { TOrderActions, orderSlice } from './slices/order';
import { TOrderInfoActions, orderInfoSlice } from './slices/order-info';
import { TSocketActions, socketSlice, wsActions } from './slices/socket';
import { TUserActions, userSlice } from './slices/user';
import { socketMiddleware } from './socket-middleware';

export const store = configureStore({
  reducer: {
    [burgerIngredientsSlice.name]: burgerIngredientsSlice.reducer,
    [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
    [orderInfoSlice.name]: orderInfoSlice.reducer,
    [socketSlice.name]: socketSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(wsActions)),
  devTools: process.env.NODE_ENV !== 'production'
});

// Union type all app actions

export type TAppActions =
  TBurgerConstructorActions |
  TBurgerIngredientsActions |
  TOrderActions |
  TOrderInfoActions |
  TUserActions |
  TSocketActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

/*
export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown, // never ??
  TAppActions
>
*/
