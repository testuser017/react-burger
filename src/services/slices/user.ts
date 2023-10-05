import { AnyAction, AsyncThunk, PayloadAction, SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks/store-hooks';
import { RootState } from '../store';
import { API } from '../../utils/api';
import { delTokens, getTokens, setTokens } from '../../utils/tokens';
import { SliceActions, TResponseUser } from '../../utils/types';

export const fetchUser = createAsyncThunk('user/fetchUser', API.fetchUser);

export const register = createAsyncThunk('user/register', API.register);

export const login = createAsyncThunk('user/login', API.login);

export const logout = createAsyncThunk('user/logout', API.logout);

export const updateUser = createAsyncThunk('user/updateUser', API.updateUser);

export const forgotPassword = createAsyncThunk('user/forgotPassword', API.forgotPassword);

export const resetPassword = createAsyncThunk('user/resetPassword', API.resetPassword);

export const checkUserAuth = () => {
  return (dispatch = useAppDispatch()) => {
    if (getTokens().accessToken) {
      dispatch(fetchUser())
        .catch(() => {
           delTokens();
           dispatch(setUser(null));
         })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

type TUserState = {
  user: null | TResponseUser['user'];
  isAuthChecked: boolean,
  isResetEmailSent: boolean,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string | undefined;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isResetEmailSent: false,
  status: 'idle',
  error: null,
};

// https://tengweiherr.medium.com/async-api-requests-with-redux-toolkit-6808d9d2c069
// https://gist.github.com/tengweiherr/51378ba92e8928df4763a4701d12da89#file-attachmentsliceamended-ts
// typing following Redux Documentation
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

// add error and its type to RejectedAction
type Modify<T, R> = Omit<T, keyof R> & R;
type ModifiedRejectedAction = Modify<RejectedAction,{
  error: SerializedError
}>

// matcher functions
function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending')
}
function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith('/fulfilled')
}
function isRejectedAction(action: AnyAction): action is ModifiedRejectedAction {
  return action.type.endsWith('/rejected')
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<TUserState['isAuthChecked']>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUserState['user']>) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthChecked = true;
      setTokens(action.payload);
    })
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthChecked = true;
      setTokens(action.payload);
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = null;
      delTokens();
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    })
    .addCase(forgotPassword.fulfilled, (state) => {
      state.isResetEmailSent = true;
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.isResetEmailSent = false;
    })

    .addMatcher(isPendingAction, (state) => {
      state.status = 'loading';
    })
    .addMatcher(isFulfilledAction, (state, action) => {
      state.status = (action.payload as { success: boolean }).success === true ? 'succeeded' : 'failed';
    })
    .addMatcher(isRejectedAction, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
  }
});

export const getUser = (state: RootState) => state.user.user;

export const { setAuthChecked, setUser } = userSlice.actions;

export default userSlice.reducer;

export type TUserActions = SliceActions<typeof userSlice.actions>;
