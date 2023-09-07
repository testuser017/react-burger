import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../utils/user-api';

export const getUser = () => {
  return (dispatch) => {
    return userApi.getUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const register = (data) => {
  return (dispatch) => {
    return userApi.register(data).then((res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const login = (data) => {
  return (dispatch) => {
    return userApi.login(data).then((res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    return userApi.logout().then(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(setUser(null));
    });
  };
};

export const forgotPassword = (data) => {
  return (dispatch) => {
    return userApi.forgotPassword(data).then((res) => {
      dispatch(setResetEmailSent(true)); // TODO
    });
  };
};

export const resetPassword = (data) => {
  return (dispatch) => {
    return userApi.resetPassword(data).then((res) => {
      dispatch(setResetEmailSent(false)); // TODO
    });
  };
};

export const updateUser = (data) => {
  return (dispatch) => {
    return userApi.updateUser(data).then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
        .catch(() => {
           localStorage.removeItem('accessToken');
           localStorage.removeItem('refreshToken');
           dispatch(setUser({}));
         })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

const initialState = {
  user: null,
  isAuthChecked: false,
  isResetEmailSent: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setResetEmailSent: (state, action) => {
      state.isResetEmailSent = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthChecked, setResetEmailSent, setUser } = userSlice.actions;

export default userSlice.reducer;
