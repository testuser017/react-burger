import reducer, {
  initialState,
  wsActions,
} from './socket';
import socketMock from '../../mocks/socket.mock.json';

describe('socketSlice', () => {

  it('initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('wsOnMessage', () => {
    const action = { type: wsActions.wsOnMessage, payload: socketMock };
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, data: socketMock });
  });

});
