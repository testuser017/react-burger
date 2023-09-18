import { createSlice } from '@reduxjs/toolkit';
import { API } from '../../utils/api';
import { RootState } from '../store';
import { useAppDispatch } from '../../hooks/store-hooks';
import { TForgotPassword, TResetPassword, TUser } from '../../utils/types';

export const getUser = () => {
  return (dispatch = useAppDispatch()) => {
    return API.getUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const register = (data: TUser) => {
  return (dispatch = useAppDispatch()) => {
    return API.register(data).then((res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const login = (data: TUser) => {
  return (dispatch = useAppDispatch()) => {
    return API.login(data).then((res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const logout = () => {
  return (dispatch = useAppDispatch()) => {
    return API.logout().then(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(setUser(null));
    });
  };
};

export const forgotPassword = (data: TForgotPassword, cb: () => void) => {
  return (dispatch = useAppDispatch()) => {
    return API.forgotPassword(data).then(() => {
      dispatch(setResetEmailSent(true));
      cb(); // navigate(RESET_PASSWORD_URL)
    });
  };
};

export const resetPassword = (data: TResetPassword, cb: () => void) => {
  return (dispatch = useAppDispatch()) => {
    return API.resetPassword(data).then(() => {
      dispatch(setResetEmailSent(false));
      cb(); // navigate(LOGIN_URL)
    });
  };
};

export const updateUser = (data: TUser) => {
  return (dispatch = useAppDispatch()) => {
    return API.updateUser(data).then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const checkUserAuth = () => {
  return (dispatch = useAppDispatch()) => {
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

type TUserState = {
  user: null | { name: string; email: string; };
  isAuthChecked: boolean,
  isResetEmailSent: boolean,
};

const initialState: TUserState = {
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

export const getUserUser = (state: RootState) => state.user.user;

export const { setAuthChecked, setResetEmailSent, setUser } = userSlice.actions;

export default userSlice.reducer;
