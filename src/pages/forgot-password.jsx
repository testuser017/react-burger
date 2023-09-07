import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormAndValidation from '../hooks/useFormAndValidation';
import { forgotPassword } from '../services/slices/user';
import { LOGIN_URL } from '../utils/constants';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({
      email: values.email,
    }));
  };

  return (
    <main className='formWrapper'>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <form onSubmit={handleFormSubmit}>
        <EmailInput
          extraClass={'mt-6'}
          placeholder={'Укажите e-mail'}
          name={'email'}
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
