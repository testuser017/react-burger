import reducer, {
  initialState,
  emptyOrderInfo,
  loadOrderInfo,
} from './order-info';
import orderInfoMock from '../../mocks/order-info.mock.json';

describe('orderInfoSlice', () => {

  it('initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('emptyOrderInfo', () => {
    const action = emptyOrderInfo();
    const result = reducer({
      ...initialState,
      data: orderInfoMock,
    }, action);
    expect(result).toEqual(initialState);
  });

  it('loadOrderInfo.pending', () => {
    const action = { type: loadOrderInfo.pending };
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, status: 'loading' });
  });

  it('loadOrderInfo.fulfilled', () => {
    const action = { type: loadOrderInfo.fulfilled, payload: orderInfoMock };
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, status: 'succeeded', data: orderInfoMock });
  });

  it('loadOrderInfo.rejected', () => {
    const action = { type: loadOrderInfo.rejected, error: { message: 'error' } };
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, status: 'failed', error: 'error' });
  });

});
