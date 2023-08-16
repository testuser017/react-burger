import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bun: null,
  filling: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    // https://redux-toolkit.js.org/api/createslice#customizing-generated-action-creators
    addIngredient: {
      reducer: (state, action) => {
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

export const burgerConstructorTotalPrice = state => {
  const bun = state.burgerConstructor.bun;
  const totalPrice = state.burgerConstructor.filling.reduce(
    (total, dataItem) => total + dataItem.price,
    (bun?.price ?? 0) * 2
  );
  return totalPrice;
};

export const countItemsById = (id, type) => state => {
  const bun = state.burgerConstructor.bun;
  const count = state.burgerConstructor.filling.filter(item => item._id === id).length;
  return type === 'bun' && id === bun?._id ? 2 : count;
};

export const { addIngredient, delIngredient, moveIngredient, emptyConstructor } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
