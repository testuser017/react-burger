import reducer, {
  initialState,
  addIngredient,
  delIngredient,
  moveIngredient,
  emptyConstructor,
} from './burger-constructor';
import ingsMock from '../../mocks/ingredients.mock.json';
import crypto from 'crypto';

Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => crypto.randomUUID()
  }
});

describe('burgerIngredientsSlice', () => {

  it('initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('addIngredient bun', () => {
    const bun = ingsMock.data.find(x => x.type === 'bun');
    const action = addIngredient(bun);
    const result = reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      bun: { ...bun, uuid: expect.any(String) },
    });
  });

  it('addIngredient filling', () => {
    const ing = ingsMock.data.find(x => x.type !== 'bun');
    const action = addIngredient(ing);
    const result = reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      filling: [{ ...ing, uuid: expect.any(String) }],
    });
  });

  it('delIngredient', () => {
    const ings = ingsMock.data;
    const uuid = 'mock-uniq-uuid';
    const action = delIngredient(uuid);
    const result = reducer({
      ...initialState,
      filling: ings,
    }, action);
    expect(result).toEqual({
      ...initialState,
      filling: ings.filter(x => x.uuid !== uuid),
    });
    expect(result.filling.length).toBe(ings.length - 1);
  });

  it('moveIngredient', () => {
    const ings = ingsMock.data;
    const action = moveIngredient({ dragIndex: 0, hoverIndex: 1 });
    const result = reducer({
      ...initialState,
      filling: ings,
    }, action);
    expect(result.filling[0]).toEqual(ings[1]);
    expect(result.filling[1]).toEqual(ings[0]);
  });

  it('emptyConstructor', () => {
    const ings = ingsMock.data;
    const action = emptyConstructor();
    const result = reducer({
      ...initialState,
      filling: ings,
    }, action);
    expect(result).toEqual(initialState);
  });

});
