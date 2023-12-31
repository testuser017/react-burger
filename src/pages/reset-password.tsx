import { FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store-hooks';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { PasswordInputMod } from '../components/mod-inputs/password-input-mod';
import useFormAndValidation from '../hooks/useFormAndValidation';
import { resetPassword } from '../services/slices/user';
import { FORGOT_PASSWORD_URL, LOGIN_URL } from '../utils/constants';

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const isResetEmailSent = useAppSelector((state) => state.user.isResetEmailSent);

  useEffect(() => {
    !isResetEmailSent && navigate(FORGOT_PASSWORD_URL);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(resetPassword(
        {
          password: values.password,
          token: values.token,
        }
      )).unwrap();
      navigate(LOGIN_URL);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className='formWrapper'>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <form onSubmit={handleFormSubmit}>
        <PasswordInputMod
          extraClass='mt-6'
          placeholder='Введите новый пароль'
          name='password'
          value={values.password ?? ''}
          onChange={handleChange}
          error={!!errors.password}
          required={true}
          autoFocus
        />
        <Input
          extraClass='mt-6'
          placeholder='Введите код из письма'
          name='token'
          value={values.token ?? ''}
          onChange={handleChange}
          error={!!errors.token}
          required={true}
        />
        <Button disabled={!isValid || !errors} htmlType='submit' type='primary' size='medium' extraClass='mt-6 mb-20'>
          Сохранить
        </Button>
      </form>

      <p className='text text_type_main-default text_color_inactive'>
        Вспомнили пароль?
        <Link
          to={LOGIN_URL}
          className='text_color_accent ml-2'
        >Войти</Link>
      </p>
    </main>
  );
};

export default ResetPasswordPage;
