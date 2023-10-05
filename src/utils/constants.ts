export const API_URL_BASE = 'https://norma.nomoreparties.space/api/';
export const WS_URL_ORDERS = 'wss://norma.nomoreparties.space/orders';
// export const API_URL_INGREDIENTS = process.env.REACT_APP_LOCALHOST_API_URL_INGREDIENTS ?? `${API_URL_BASE}ingredients`;
// export const API_URL_ORDERS = process.env.REACT_APP_LOCALHOST_API_URL_ORDERS ?? `${API_URL_BASE}orders`;

const dictionaryPairs: { [key: string]: string } = {
  top: 'верх',
  bottom: 'низ',
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углеводы, г',
  calories: 'Калории,ккал',
  created: 'Создан',
  done: 'Выполнен',
  pending: 'Готовится',
  done_sl: 'Готовы',
  pending_sl: 'В работе',
};

export const DICTIONARY = (key: string) => dictionaryPairs[key] ?? key;

export const LOGIN_URL = '/login';
export const REGISTER_URL = '/register';
export const FORGOT_PASSWORD_URL = '/forgot-password';
export const RESET_PASSWORD_URL = '/reset-password';
export const PROFILE_URL = '/profile';
export const INGREDIENTS_DETAILS_URL = (id: string) => `/ingredients/${id}`;
export const FEED_URL = (number: string) => `/feed/${number}`;
export const PROFILE_ORDERS_URL = (number: string) => `/profile/orders/${number}`;
