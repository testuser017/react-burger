import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormAndValidation from '../hooks/useFormAndValidation';
import { resetPassword } from '../services/slices/user';
import { LOGIN_URL } from '../utils/constants';

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({
      password: values.password,
      token: values.token,
    }));
  };

  return (
    <main className='formWrapper'>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <form onSubmit={handleFormSubmit}>
        <PasswordInput
          extraClass={'mt-6'}
          placeholder={'Введите новый пароль'}
          name={'password'}
          value={values.password ?? ''}
          onChange={handleChange}
          error={!!errors.password}
          required={true}
          autoFocus
        />
        <Input
          extraClass={'mt-6'}
          placeholder={'Введите код из письма'}
          name={'token'}
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
