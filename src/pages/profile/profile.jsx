import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { logout, updateUser } from '../../services/slices/user';
import { ORDERS_URL, PROFILE_URL } from '../../utils/constants';
import styles from './profile.module.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { values, handleChange, errors, isValid, setValues } = useFormAndValidation();

  const user = useSelector((store) => store.user.user);

  const handleFormReset = useCallback(() => {
    setValues({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
    });
  }, [setValues, user]);

  useEffect(() => {
    handleFormReset();
  }, [handleFormReset, user]);

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
//  dispatch(updateUser( Object.fromEntries(new FormData(e.target)) ));
//  dispatch(updateUser(values));
    dispatch(updateUser({
      name: values.name,
      email: values.email,
      password: values.password,
    }));
  };

  return (
    <main className={`${styles.profile} pl-5 pr-5`}>
      <section className={styles.profileSidebar}>
        <ul className={`${styles.profileMenu} text text_type_main-medium`}>
          <li>
            <NavLink
              className={({ isActive }) => isActive ? styles.profileMenuLinkActive : styles.profileMenuLink}
              to={PROFILE_URL}>Профиль</NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => isActive ? styles.profileMenuLinkActive : styles.profileMenuLink}
              to={ORDERS_URL('')}>История заказов</NavLink>
          </li>
          <li>
            <Button htmlType='button' type='secondary' extraClass={styles.profileMenuButton} onClick={handleLogoutClick}>
              Выход
            </Button>
          </li>
        </ul>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </section>
      <section>
        <form onSubmit={handleFormSubmit} className={styles.profileForm}>
          <Input
            extraClass={'mt-6'}
            placeholder={'Имя'}
            name={'name'}
            value={values.name ?? ''}
            onChange={handleChange}
            error={!!errors.name}
            required={true}
            icon={'EditIcon'}
            autoFocus
          />
          <EmailInput
            extraClass={'mt-6'}
            placeholder={'Логин'}
            name={'email'}
            value={values.email ?? ''}
            onChange={handleChange}
            error={!!errors.email}
            required={true}
            icon={'EditIcon'}
          />
          <PasswordInput
            extraClass={'mt-6'}
            name={'password'}
            value={values.password ?? ''}
            onChange={handleChange}
            error={!!errors.password}
            required={true}
            // icon={'EditIcon'}
          />
          {(values.name !== (user?.name ?? '') || values.email !== (user?.email ?? '') || values.password !== '') && (
            <>
              <Button htmlType='reset' type='secondary' size='medium' extraClass='mt-6' onClick={handleFormReset}>
                Отмена
              </Button>
              <Button disabled={!isValid || !errors} htmlType='submit' type='primary' size='medium' extraClass='mt-6'>
                Сохранить
              </Button>
            </>
          )}
        </form>
      </section>
    </main>
  );
};

export default ProfilePage;
