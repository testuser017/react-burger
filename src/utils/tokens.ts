import { TResponseTokens } from './types';

export const delTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const getTokens = (bearer = true) => {
  const accessToken = localStorage.getItem('accessToken');
  return {
    accessToken: bearer ? accessToken : accessToken?.replace('Bearer ', ''),
    refreshToken: localStorage.getItem('refreshToken'),
  };
};

export const setTokens = (res: TResponseTokens) => {
  localStorage.setItem('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
};

// export const TOKENS = {
//   del: delTokens,
//   get: getTokens,
//   set: setTokens,
// };
