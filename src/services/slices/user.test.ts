import reducer, {
  initialState,
  setAuthChecked,
  fetchUser,
  register,
  logout,
  updateUser,
  forgotPassword,
} from './user';
import {
  user,
  updatedUser,
  registeredUser,
  logoutResponse,
  forgotPasswordResponse,
} from '../../mocks/user.mock';

describe('userSlice', () => {

  it('initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('setAuthChecked', () => {
    const action = setAuthChecked(true);
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, isAuthChecked: true });
  });

  it('fetchUser.fulfilled', () => {
    const action = { type: fetchUser.fulfilled.type, payload: user };
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, status: 'succeeded', user: user.user });
  });

  it('fetchUser.rejected', () => {
    const action = { type: fetchUser.rejected.type, error: { message: 'error' } };
    const result = reducer({
      ...initialState,
      status: 'succeeded',
      isAuthChecked: true,
      user: user.user,
    }, action);
    expect(result).toEqual({
      ...initialState,
      status: 'failed',
      isAuthChecked: true,
      user: null,
      error: 'error',
    });
  });

  it('register.fulfilled', () => { // login.fulfilled is identical
    const action = { type: register.fulfilled.type, payload: registeredUser };
    const result = reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      status: 'succeeded',
      isAuthChecked: true,
      user: registeredUser.user,
    });
  });

  it('logout.fulfilled', () => {
    const action = { type: logout.fulfilled.type, payload: logoutResponse };
    const result = reducer({
      ...initialState,
      status: 'succeeded',
      isAuthChecked: true,
      user: user.user,
    }, action);
    expect(result).toEqual({
      ...initialState,
      status: 'succeeded',
      isAuthChecked: true,
      user: null,
    });
  });

  it('updateUser.fulfilled', () => {
    const action = { type: updateUser.fulfilled.type, payload: updatedUser };
    const result = reducer({
        ...initialState,
        status: 'succeeded',
        isAuthChecked: true,
        user: user.user,
      }, action);
    expect(result).toEqual({
      ...initialState,
      status: 'succeeded',
      isAuthChecked: true,
      user: updatedUser.user,
    });
  });

  it('forgotPassword.fulfilled', () => { // resetPassword.fulfilled is identical but isResetEmailSent: false
    const action = { type: forgotPassword.fulfilled.type, payload: forgotPasswordResponse };
    const result = reducer(initialState, action);
    expect(result).toEqual({ ...initialState, status: 'succeeded', isResetEmailSent: true });
  });

});
