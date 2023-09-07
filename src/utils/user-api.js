import { API_URL_BASE } from '../utils/constants';

const request = async (url, options) => {
  try {
    const res = await fetch(`${API_URL_BASE}${url}`, options);
    if(!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  } catch(error) {
    console.log(error);
  };
};

const prepareData = (body = null, method = 'POST', headers = {}) => {
  const options = {
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

const getUser = () => request('auth/user', prepareData(null, 'GET', { Authorization: localStorage.getItem('accessToken') }));

const register = (data) => request('auth/register', prepareData(data));

const login = (data) => request('auth/login', prepareData(data));

const logout = () => request('auth/logout', prepareData({ token: localStorage.getItem('refreshToken') }));

const forgotPassword = (data) => request('password-reset', prepareData(data));

const resetPassword = (data) => request('password-reset/reset', prepareData(data));

const updateUser = (data) => request('auth/user', prepareData(data, 'PATCH', { Authorization: localStorage.getItem('accessToken') }));

export const userApi = {
  getUser,
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateUser,
};
