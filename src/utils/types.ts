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
