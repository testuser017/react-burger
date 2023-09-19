// https://codesandbox.io/p/github/akruglov-it/protected-route-updated-sandbox/postcode-classic?file=/src/components/protected-route.jsx:1,1
// https://app.pachca.com/chats/6399739?message=74300874

import { FC, ReactElement } from "react";
import { useAppSelector } from "../../hooks/store-hooks";
import { Navigate, useLocation } from "react-router-dom";
import { getUserUser } from "../../services/slices/user";
import { LOGIN_URL } from "../../utils/constants";

type Props = {
  onlyUnAuth?: boolean;
  component: ReactElement;
};

const Protected: FC<Props> = ({ onlyUnAuth = false, component }) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useAppSelector((state) => state.user.isAuthChecked);
  const user = useAppSelector(getUserUser);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return null;
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={LOGIN_URL} state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth: FC<Props> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
