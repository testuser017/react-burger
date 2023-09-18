import { API_URL_BASE } from '../utils/constants';
import {
  TUser,
  TForgotPassword,
  TResetPassword,
  TFetchOptions,
  TResponseUser,
  TResponseTokens,
  TResponseMessage,
} from './types';

const checkReponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// https://app.pachca.com/chats/6399739?message=73782497
// https://app.pachca.com/chats/6399739?message=73782498
const fetchWithRefresh = async <T>(shortApiEndpoint: string, options: TFetchOptions): Promise<T> => { // options: RequestInit ??
  const url = `${API_URL_BASE}${shortApiEndpoint}`;
  try {
    const res = await fetch(url, options); //делаем запрос
    return await checkReponse(res);
  } catch (err) {
    if (err instanceof Error && err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken); //(или в cookies)
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //вызываем перезапрос данных
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const prepareData = (
  body: null | {} = null,
  method: TFetchOptions['method'] = 'POST',
  headers: {} = {}
) => {
  const options: TFetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...headers
    }
  };
  if (body) {
    options['body'] = JSON.stringify(body);
  }
  return options;
};

const getUser = () =>
  fetchWithRefresh<TResponseUser>('auth/user', prepareData(null, 'GET', { Authorization: localStorage.getItem('accessToken') }));

const refreshToken = () =>
  fetchWithRefresh<TResponseTokens>('auth/token', prepareData({ token: localStorage.getItem('refreshToken') }));

const register = (data: TUser) =>
  fetchWithRefresh<TResponseUser & TResponseTokens>('auth/register', prepareData(data));

const login = (data: TUser) =>
  fetchWithRefresh<TResponseUser & TResponseTokens>('auth/login', prepareData(data));

const logout = () =>
  fetchWithRefresh<TResponseMessage>('auth/logout', prepareData({ token: localStorage.getItem('refreshToken') }));

const forgotPassword = (data: TForgotPassword) =>
  fetchWithRefresh<TResponseMessage>('password-reset', prepareData(data));

const resetPassword = (data: TResetPassword) =>
  fetchWithRefresh<TResponseMessage>('password-reset/reset', prepareData(data));

const updateUser = (data: TUser) =>
  fetchWithRefresh<TResponseUser>('auth/user', prepareData(data, 'PATCH', { Authorization: localStorage.getItem('accessToken') }));

export const API = {
  getUser,
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateUser,
};
