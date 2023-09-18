import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getApiData } from '../../services/slices/burger-ingredients';
import MainPage from '../../pages/main/main';
import ProfilePage from '../../pages/profile/profile';
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
} from '../../utils/constants';
import { checkUserAuth } from '../../services/slices/user';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const apiDataStatus = useAppSelector((state) => state.burgerIngredients.status); // TODO: isLoading
//const errorMessage = useAppSelector((state) => state.burgerIngredients.error); // TODO: isError

  useEffect(() => {
    dispatch(checkUserAuth());
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (apiDataStatus === 'idle') {
      dispatch(getApiData());
    }
  }, [apiDataStatus, dispatch]);

  const handleModalClose = () => navigate(-1);

  return (
    <>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<MainPage />}/>
        <Route path={INGREDIENTS_DETAILS_URL()} element={<IngredientDetails />} />
        <Route path={PROFILE_URL} element={<OnlyAuth component={<ProfilePage />} />} />
        <Route path={LOGIN_URL} element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path={REGISTER_URL} element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path={FORGOT_PASSWORD_URL} element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path={RESET_PASSWORD_URL} element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path='*' element={<NotFound404Page />} />
      </Routes>

      {background && (
        <Routes>
          <Route path={INGREDIENTS_DETAILS_URL()} element={
            <Modal hideModal={handleModalClose} modalHeaderText="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          }/>
        </Routes>
      )}
    </>
  );
}

export default App;
