import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import OrdersIngsPrice from './orders-list-ingredients-price';
import { DICTIONARY, FEED_URL, PROFILE_ORDERS_URL, WS_URL_ORDERS } from '../../utils/constants';
import { wsActions } from '../../services/slices/socket';
import { getTokens } from '../../utils/tokens';
import styles from './orders-list.module.css';

const OrdersList = () => {
  const location = useLocation();
  const isProfilePage = useMatch(PROFILE_ORDERS_URL(''));
  const orders = useAppSelector((state) => state.socket.data?.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const wsUrl = isProfilePage
      ? `${WS_URL_ORDERS}?token=${getTokens(false).accessToken}`
      : `${WS_URL_ORDERS}/all`;
    dispatch({ type: wsActions.wsConnect, payload: wsUrl });
    return () => {
      dispatch({ type: wsActions.wsDisconnect });
      // TODO: empty state.socket ??
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const ordersSorted = orders ? [...orders].sort((a, b) => b.number - a.number) : [];
  const ordersSorted = orders ? [...orders].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)) : [];

  return (
    <section className={`${styles.ordersList} custom-scroll ${isProfilePage && styles.ordersListProfilePage}`}>
      {ordersSorted.map(order => (
        <Link
          key={order._id}
          className={styles.ordersListItem}
          to={isProfilePage ? PROFILE_ORDERS_URL(`${order.number}`) : FEED_URL(`${order.number}`)}
          state={{ background: location }}
        >
          <div className={styles.ordersListNumTime}>
            <div className={styles.ordersListNum}>#{order.number}</div>
            <FormattedDate date={new Date(order.updatedAt)} className="text_color_inactive" />
          </div>
          <h2 className={styles.ordersListName}>{order.name}</h2>
          {isProfilePage && (
            <div className={styles.ordersListStatus} data-status={order.status}>{DICTIONARY(order.status)}</div>
          )}
          <OrdersIngsPrice ingsIds={order.ingredients} />
        </Link>
      ))}
    </section>
  );
};

export default OrdersList;
