import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeaderNavItem = ({ navItemName, navItemLink, navItemIcon, navItemIsActive }) => {
  const NavIcon = navItemIcon;

  return (
    <li className={`${styles.navItem} mr-2`}>
      <a href={navItemLink} className={`${styles.navLink} pl-5 pr-5 pb-4 pt-4 text text_type_main-default text_color_${navItemIsActive ? 'primary' : 'inactive'}`}>
        <NavIcon type={navItemIsActive ? 'primary' : 'secondary'} />
        <span className="ml-2">{navItemName}</span>
      </a>
    </li>
  );
};

AppHeaderNavItem.propTypes = {
  navItemName: PropTypes.string.isRequired,
  navItemLink: PropTypes.string.isRequired,
  navItemIcon: PropTypes.elementType.isRequired,
  navItemIsActive: PropTypes.bool,
};

const AppHeader = () => {
  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      <nav className={`${styles.navWrap}`}>
        <ul className={styles.navBlock}>
          <AppHeaderNavItem navItemName="Конструктор" navItemLink="#" navItemIcon={BurgerIcon} />
          <AppHeaderNavItem navItemName="Лента заказов" navItemLink="#" navItemIcon={ListIcon} navItemIsActive />
          <AppHeaderNavItem navItemName="Личный кабинет" navItemLink="#" navItemIcon={ProfileIcon} />
        </ul>
      </nav>
      <div className={styles.logo}><Logo /></div>
    </header>
  );
};

export default AppHeader;
