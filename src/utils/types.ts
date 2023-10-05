export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TIngredientConstructor = {
  uuid: string;
} & TIngredient;

export type TRequestOrder = {
  'ingredients': string[];
};

export type TUser = {
  name?: string;
  email: string;
  password: string;
};

export type TForgotPassword = {
  email: string;
};

export type TResetPassword = {
  password: string;
  token: string;
};

export type TFetchOptions = {
  method: 'GET' | 'PATCH' | 'POST'; // 'DELETE' | 'PUT'
  headers: {
    [key: string]: string;
  };
  body?: string;
};

// API Responses

export type TResponseUser = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

export type TResponseTokens = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TResponseMessage = {
  success: boolean;
  message: string;
};

export type TResponseIngredients = {
  success: boolean;
  data: TIngredient[];
};

export type TResponseOrder = {
  success: boolean;
  name: string;
  order: {
    number: number | null;
  };
};

export type TResponseOrders = {
  success: boolean;
  orders: {
    _id: string;
    ingredients: string[];
    owner?: string;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
  }[];
  total?: number;
  totalToday?: number;
};

// createSlice type helper
// https://app.pachca.com/chats/6399761?message=85113462

export type SliceActions<T> = { [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never; }[keyof T];
