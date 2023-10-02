import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store-hooks';
import { getUserUser } from '../../services/slices/user';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FEED_URL, PROFILE_URL } from '../../utils/constants';
import styles from './app-header.module.css';

const AppHeader = () => {
  const user = useAppSelector(getUserUser);

  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      <nav className={`${styles.navWrap}`}>
        <ul className={styles.navBlock}>
          <li className={`${styles.navItem} mr-2`}>
            <NavLink
              to='/'
              className={`${styles.navLink} pl-5 pr-5 pb-4 pt-4 text text_type_main-default`}
            >{({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <span className={`ml-2 text_color_${isActive ? 'primary' : 'inactive'}`}>Конструктор</span>
              </>
            )}
            </NavLink>
          </li>

          <li className={`${styles.navItem} mr-2`}>
            <NavLink
              to={FEED_URL('')}
              className={`${styles.navLink} pl-5 pr-5 pb-4 pt-4 text text_type_main-default`}
            >{({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <span className={`ml-2 text_color_${isActive ? 'primary' : 'inactive'}`}>Лента заказов</span>
              </>
            )}
            </NavLink>
          </li>

          <li className={`${styles.navItem} mr-2`}>
            <NavLink
              to={PROFILE_URL}
              className={`${styles.navLink} pl-5 pr-5 pb-4 pt-4 text text_type_main-default`}
            >{({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                <span className={`ml-2 text_color_${isActive ? 'primary' : 'inactive'}`}>{user?.name ?? 'Личный кабинет'}</span>
              </>
            )}
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.logo}>
        <NavLink to='/'>
          <Logo />
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;
