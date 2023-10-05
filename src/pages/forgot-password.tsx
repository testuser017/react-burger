import { FormEvent } from 'react';
import { useAppDispatch } from '../hooks/store-hooks';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { EmailInputMod } from '../components/mod-inputs/email-input-mod';
import useFormAndValidation from '../hooks/useFormAndValidation';
import { forgotPassword } from '../services/slices/user';
import { LOGIN_URL, RESET_PASSWORD_URL } from '../utils/constants';

const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(forgotPassword(
        {
          email: values.email
        }
      )).unwrap();
      navigate(RESET_PASSWORD_URL);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className='formWrapper'>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <form onSubmit={handleFormSubmit}>
        <EmailInputMod
          extraClass='mt-6'
          placeholder='Укажите e-mail'
          name='email'
          value={values.email ?? ''}
          onChange={handleChange}
          error={!!errors.email}
          required={true}
          autoFocus
        />
        <Button disabled={!isValid || !errors} htmlType='submit' type='primary' size='medium' extraClass='mt-6 mb-20'>
          Восстановить
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

export default ForgotPasswordPage;
