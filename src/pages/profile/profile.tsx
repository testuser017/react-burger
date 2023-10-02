import { FormEvent, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { EmailInputMod } from '../../components/mod-inputs/email-input-mod';
import { PasswordInputMod } from '../../components/mod-inputs/password-input-mod';
import ProfilePageNav from './profile-nav';
import { getUserUser, updateUser } from '../../services/slices/user';
import styles from './profile.module.css';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { values, handleChange, errors, isValid, setValues } = useFormAndValidation();

  const user = useAppSelector(getUserUser);

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

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    <main className="main-profile">
      <ProfilePageNav />
      <section>
        <form onSubmit={handleFormSubmit} className={styles.profileForm}>
          <Input
            placeholder='Имя'
            name='name'
            value={values.name ?? ''}
            onChange={handleChange}
            error={!!errors.name}
            required={true}
            icon='EditIcon'
            autoFocus
          />
          <EmailInputMod
            extraClass='mt-6'
            placeholder='Логин'
            name='email'
            value={values.email ?? ''}
            onChange={handleChange}
            error={!!errors.email}
            required={true}
            isIcon
          />
          <PasswordInputMod
            extraClass='mt-6'
            name='password'
            value={values.password ?? ''}
            onChange={handleChange}
            error={!!errors.password}
            required={true}
            icon='EditIcon'
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
