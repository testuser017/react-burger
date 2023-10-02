import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { emptyOrder } from '../../services/slices/order';
// import { ReactComponent as DoneImg} from '../../images/done.svg';
import doneImg from '../../images/done.svg';
import styles from './order-details.module.css';

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const orderNumber = useAppSelector((state) => state.order.data?.order?.number);

  useEffect(() => {
    return () => {
      dispatch(emptyOrder());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.orderDetails} pt-20 pr-15 pb-20 pl-15`}>
      <h3 className={`${styles.orderDetailsId} text text_type_digits-large mb-8`}>{orderNumber ?? <i className={styles.orderDetailsSpinner}>.</i>}</h3>
      <h4 className="text text_type_main-medium mb-15">идентификатор заказа</h4>
      <img src={doneImg} className={styles.orderDetailsDone} alt="заказ оформлен" />
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;
