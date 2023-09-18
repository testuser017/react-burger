export const API_URL_BASE = 'https://norma.nomoreparties.space/api/';
export const API_URL_INGREDIENTS = process.env.REACT_APP_LOCALHOST_API_URL_INGREDIENTS ?? `${API_URL_BASE}ingredients`;
export const API_URL_ORDERS = process.env.REACT_APP_LOCALHOST_API_URL_ORDERS ?? `${API_URL_BASE}orders`;

export const DICTIONARY: { [key: string]: string } = {
  top: 'верх',
  bottom: 'низ',
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углеводы, г',
  calories: 'Калории,ккал',
};

export const LOGIN_URL = '/login';
export const REGISTER_URL = '/register';
export const FORGOT_PASSWORD_URL = '/forgot-password';
export const RESET_PASSWORD_URL = '/reset-password';
export const PROFILE_URL = '/profile';
export const INGREDIENTS_DETAILS_URL = (id = ':id') => `/ingredients/${id}`;
export const ORDERS_URL = (id = ':id') => `/profile/orders/${id}`;
