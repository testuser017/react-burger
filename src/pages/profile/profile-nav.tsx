import { useAppDispatch } from '../../hooks/store-hooks';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { logout } from '../../services/slices/user';
import { PROFILE_ORDERS_URL, PROFILE_URL } from '../../utils/constants';
import styles from './profile-nav.module.css';

const ProfilePageNav = () => {
  const dispatch = useAppDispatch();
  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <section className={styles.profileSidebar}>
      <ul className={`${styles.profileNav} text text_type_main-medium`}>
        <li>
          <NavLink
            end
            className={({ isActive }) => isActive ? styles.profileNavLinkActive : styles.profileNavLink}
            to={PROFILE_URL}>Профиль</NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? styles.profileNavLinkActive : styles.profileNavLink}
            to={PROFILE_ORDERS_URL('')}>История заказов</NavLink>
        </li>
        <li>
          <Button htmlType="button" type="secondary" extraClass={styles.profileNavButton} onClick={handleLogoutClick}>
            Выход
          </Button>
        </li>
      </ul>
      <p className="text text_type_main-default text_color_inactive mt-20">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </section>
  );
};

export default ProfilePageNav;
