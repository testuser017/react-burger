import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormAndValidation from '../hooks/useFormAndValidation';
import { login } from '../services/slices/user';
import { FORGOT_PASSWORD_URL, REGISTER_URL } from '../utils/constants';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login({
      name: values.name,
      email: values.email,
      password: values.password,
    }));
  };

  return (
    <main className='formWrapper'>
      <h1 className='text text_type_main-medium'>Вход</h1>
      <form onSubmit={handleFormSubmit}>
        <EmailInput
          extraClass={'mt-6'}
          name={'email'}
          value={values.email ?? ''}
          onChange={handleChange}
          error={!!errors.email}
          required={true}
          autoFocus
        />
        <PasswordInput
          extraClass={'mt-6'}
          name={'password'}
          value={values.password ?? ''}
          onChange={handleChange}
          error={!!errors.password}
          required={true}
        />
        <Button disabled={!isValid || !errors} htmlType='submit' type='primary' size='medium' extraClass='mt-6 mb-20'>
          Войти
        </Button>
      </form>

      <p className='text text_type_main-default text_color_inactive mb-4'>
        Вы — новый пользователь?
        <Link
          to={REGISTER_URL}
          className='text_color_accent ml-2'
        >Зарегистрироваться</Link>
      </p>

      <p className='text text_type_main-default text_color_inactive'>
        Забыли пароль?
        <Link
          to={FORGOT_PASSWORD_URL}
          className='text_color_accent ml-2'
        >Восстановить пароль</Link>
      </p>
    </main>
  );
};

export default LoginPage;
