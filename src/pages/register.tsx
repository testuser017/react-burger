import { FormEvent } from 'react';
import { useAppDispatch } from '../hooks/store-hooks';
import { Link } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { EmailInputMod } from '../components/mod-inputs/email-input-mod';
import { PasswordInputMod } from '../components/mod-inputs/password-input-mod';
import useFormAndValidation from '../hooks/useFormAndValidation';
import { register } from '../services/slices/user';
import { LOGIN_URL } from '../utils/constants';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({
      name: values.name,
      email: values.email,
      password: values.password,
    }));
  };

  return (
    <main className='formWrapper'>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <form onSubmit={handleFormSubmit}>
        <Input
          extraClass='mt-6'
          placeholder='Имя'
          name='name'
          value={values.name ?? ''}
          onChange={handleChange}
          error={!!errors.name}
          required={true}
          autoFocus
        />
        <EmailInputMod
          extraClass='mt-6'
          name='email'
          value={values.email ?? ''}
          onChange={handleChange}
          error={!!errors.email}
          required={true}
        />
        <PasswordInputMod
          extraClass='mt-6'
          name='password'
          value={values.password ?? ''}
          onChange={handleChange}
          error={!!errors.password}
          required={true}
        />
        <Button disabled={!isValid || !errors} htmlType='submit' type='primary' size='medium' extraClass='mt-6 mb-20'>
          Зарегистрироваться
        </Button>
      </form>

      <p className='text text_type_main-default text_color_inactive'>
        Уже зарегистрированы?
        <Link
          to={LOGIN_URL}
          className='text_color_accent ml-2'
        >Войти</Link>
      </p>
    </main>
  );
};

export default RegisterPage;
