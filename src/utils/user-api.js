import { API_URL_BASE } from '../utils/constants';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// https://app.pachca.com/chats/6399739?message=73782497
// https://app.pachca.com/chats/6399739?message=73782498
const fetchWithRefresh = async (shortApiEndpoint, options) => {
  const url = `${API_URL_BASE}${shortApiEndpoint}`;
  try {
    const res = await fetch(url, options); //делаем запрос
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
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

const getUser = () => fetchWithRefresh('auth/user', prepareData(null, 'GET', { Authorization: localStorage.getItem('accessToken') }));

const refreshToken = () => fetchWithRefresh('auth/token', prepareData({ token: localStorage.getItem('refreshToken') }));

const register = (data) => fetchWithRefresh('auth/register', prepareData(data));

const login = (data) => fetchWithRefresh('auth/login', prepareData(data));

const logout = () => fetchWithRefresh('auth/logout', prepareData({ token: localStorage.getItem('refreshToken') }));

const forgotPassword = (data) => fetchWithRefresh('password-reset', prepareData(data));

const resetPassword = (data) => fetchWithRefresh('password-reset/reset', prepareData(data));

const updateUser = (data) => fetchWithRefresh('auth/user', prepareData(data, 'PATCH', { Authorization: localStorage.getItem('accessToken') }));

export const userApi = {
  getUser,
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateUser,
};
