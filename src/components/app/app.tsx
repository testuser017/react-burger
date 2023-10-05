import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderInfo from '../order-info/order-info';
import { loadIngredients } from '../../services/slices/burger-ingredients';
import FeedPage from '../../pages/feed/feed';
import MainPage from '../../pages/main';
import ProfilePage from '../../pages/profile/profile';
import ProfileOrdersPage from '../../pages/profile/profile-orders';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import NotFound404Page from '../../pages/not-found-404/not-found-404';
import {
  INGREDIENTS_DETAILS_URL,
  LOGIN_URL,
  REGISTER_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
  PROFILE_URL,
  FEED_URL,
  PROFILE_ORDERS_URL,
} from '../../utils/constants';
import { checkUserAuth } from '../../services/slices/user';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const ingredientsStatus = useAppSelector((state) => state.burgerIngredients.status); // TODO: isLoading
//const errorMessage = useAppSelector((state) => state.burgerIngredients.error); // TODO: isError

  useEffect(() => {
    ingredientsStatus === 'idle' && dispatch(loadIngredients());
    dispatch(checkUserAuth());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleModalClose = () => navigate(-1);

  return (
    <>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<MainPage />}/>
        <Route path={INGREDIENTS_DETAILS_URL(':id')} element={<IngredientDetails />} />
        <Route path={PROFILE_URL} element={<OnlyAuth component={<ProfilePage />} />} />
        <Route path={LOGIN_URL} element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path={REGISTER_URL} element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path={FORGOT_PASSWORD_URL} element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path={RESET_PASSWORD_URL} element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path={FEED_URL('')} element={<FeedPage />} />
        <Route path={FEED_URL(':number')} element={<OrderInfo />} />
        <Route path={PROFILE_ORDERS_URL('')} element={<OnlyAuth component={<ProfileOrdersPage />} />} />
        <Route path={PROFILE_ORDERS_URL(':number')} element={<OnlyAuth component={<OrderInfo />} />} />
        <Route path='*' element={<NotFound404Page />} />
      </Routes>

      {background && (
        <Routes>
          <Route path={INGREDIENTS_DETAILS_URL(':id')} element={
            <Modal hideModal={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }/>
          <Route path={FEED_URL(':number')} element={
            <Modal hideModal={handleModalClose}>
              <OrderInfo />
            </Modal>
          }/>
          <Route path={PROFILE_ORDERS_URL(':number')} element={
            <OnlyAuth component={
              <Modal hideModal={handleModalClose}>
                <OrderInfo />
              </Modal>
            }/>
          }/>
        </Routes>
      )}
    </>
  );
}

export default App;
