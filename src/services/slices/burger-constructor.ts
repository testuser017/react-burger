import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TIngredientConstructor } from '../../utils/types';
import { RootState } from '../store';

type TBurgerConstructorState = {
  bun: null | TIngredient;
  filling: TIngredientConstructor[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  filling: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    // https://redux-toolkit.js.org/api/createslice#customizing-generated-action-creators
    // https://redux.js.org/usage/usage-with-typescript
    addIngredient: {
      reducer: (state, action: PayloadAction<TIngredientConstructor>) => {
        if(action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.filling.push(action.payload);
        }
      },
      prepare: item => ({
        payload: { ...item, uuid: crypto.randomUUID() }
      }),
    },
    delIngredient(state, action) {
      state.filling = state.filling.filter(item => item.uuid !== action.payload);
    },
    moveIngredient(state, action) {
      const { dragIndex, hoverIndex } = action.payload;
      state.filling.splice(dragIndex, 0, state.filling.splice(hoverIndex, 1)[0]);
    },
    emptyConstructor: () => initialState
  }
});

export const getConstructorTotalPrice = (state: RootState) => {
  const bun = state.burgerConstructor.bun;
  const totalPrice = state.burgerConstructor.filling.reduce(
    (total, dataItem) => total + dataItem.price,
    (bun?.price ?? 0) * 2
  );
  return totalPrice;
};

export const countConstructorItemsById = (id: string) => (state: RootState) => {
  const bun = state.burgerConstructor.bun;
  const constructorItems = bun ? [bun, ...state.burgerConstructor.filling, bun] : state.burgerConstructor.filling;
  return constructorItems.filter(item => item._id === id).length;
};

export const getConstructorBun = (state: RootState) => state.burgerConstructor.bun;

export const getConstructorFilling = (state: RootState) => state.burgerConstructor.filling;

export const { addIngredient, delIngredient, moveIngredient, emptyConstructor } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
