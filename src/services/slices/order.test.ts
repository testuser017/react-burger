import reducer, {
  initialState,
  emptyOrder,
  requestOrder,
} from './order';
import orderMock from '../../mocks/order.mock.json';

describe('orderSlice', () => {

  it('initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('emptyOrder', () => {
    const action = emptyOrder();
    const result = reducer({
      ...initialState,
      data: orderMock,
    }, action);
    expect(result).toEqual(initialState);
  });

  it('requestOrder.pending', () => {
    const action = { type: requestOrder.pending };
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, status: 'loading' });
  });

  it('requestOrder.fulfilled', () => {
    const action = { type: requestOrder.fulfilled, payload: orderMock };
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, status: 'succeeded', data: orderMock });
  });

  it('requestOrder.rejected', () => {
    const action = { type: requestOrder.rejected, error: { message: 'error' } };
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, status: 'failed', error: 'error' });
  });

});
