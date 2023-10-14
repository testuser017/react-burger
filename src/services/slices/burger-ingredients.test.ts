import reducer, { initialState, loadIngredients } from './burger-ingredients';
import ingsMock from '../../mocks/ingredients.mock.json';

describe('burgerIngredientsSlice', () => {

  it('initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('loadIngredients.pending', () => {
    const action = { type: loadIngredients.pending };
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, status: 'loading' });
  });

  it('loadIngredients.fulfilled', () => {
    const action = { type: loadIngredients.fulfilled, payload: ingsMock };
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, status: 'succeeded', data: ingsMock.data });
  });

  it('loadIngredients.rejected', () => {
    const action = { type: loadIngredients.rejected, error: { message: 'error' } };
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, status: 'failed', error: 'error' });
  });

});
