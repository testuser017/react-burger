import { API_URL_BASE } from './constants';
import { getTokens, setTokens } from './tokens';
import {
  TUser,
  TRequestOrder,
  TForgotPassword,
  TResetPassword,
  TFetchOptions,
  TResponseUser,
  TResponseTokens,
  TResponseMessage,
  TResponseIngredients,
  TResponseOrder,
  TResponseOrders,
} from './types';

const checkReponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// https://app.pachca.com/chats/6399739?message=73782497
// https://app.pachca.com/chats/6399739?message=73782498
const fetchWithRefresh = async <T>(shortApiEndpoint: string, options: TFetchOptions): Promise<T> => { // options: RequestInit ??
  const url = `${API_URL_BASE}${shortApiEndpoint}`;
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if ((err as TResponseMessage).message === 'jwt expired') {
      const refreshData = await refreshTokens();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
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

const fetchUser = () =>
  fetchWithRefresh<TResponseUser>('auth/user', prepareData(null, 'GET', { Authorization: getTokens().accessToken }));

export const refreshTokens = async () => {
  const res = await fetchWithRefresh<TResponseTokens>('auth/token', prepareData({ token: getTokens().refreshToken }));
  res.success && setTokens(res);
  return res;
};

const register = (data: TUser) =>
  fetchWithRefresh<TResponseUser & TResponseTokens>('auth/register', prepareData(data));

const login = (data: TUser) =>
  fetchWithRefresh<TResponseUser & TResponseTokens>('auth/login', prepareData(data));

const logout = () =>
  fetchWithRefresh<TResponseMessage>('auth/logout', prepareData({ token: getTokens().refreshToken }));

const forgotPassword = (data: TForgotPassword) =>
  fetchWithRefresh<TResponseMessage>('password-reset', prepareData(data));

const resetPassword = (data: TResetPassword) =>
  fetchWithRefresh<TResponseMessage>('password-reset/reset', prepareData(data));

const updateUser = (data: TUser) =>
  fetchWithRefresh<TResponseUser>('auth/user', prepareData(data, 'PATCH', { Authorization: getTokens().accessToken }));

export const fetchIngredients = () =>
  fetchWithRefresh<TResponseIngredients>('ingredients', prepareData(null, 'GET'));

export const fetchOrder = (data: TRequestOrder) =>
  fetchWithRefresh<TResponseOrder>('orders', prepareData(data, 'POST', { Authorization: getTokens().accessToken }));

export const fetchOrderInfo = (id: string) =>
  fetchWithRefresh<TResponseOrders>(`orders/${id}`, prepareData(null, 'GET'));

export const API = {
  fetchUser,
  refreshTokens,
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateUser,
  fetchIngredients,
  fetchOrder,
  fetchOrderInfo,
};
