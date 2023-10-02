import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { useParams } from 'react-router-dom';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredients } from '../../services/slices/burger-ingredients';
import Price from '../price/price';
import { DICTIONARY } from '../../utils/constants';
import styles from './order-info.module.css';
import { emptyOrderInfo, loadOrderInfo } from '../../services/slices/order-info';

type TOrderItem = {
  qty: number;
  img: string;
  name: string;
  price: number;
};

const OrderInfoItem: FC<{ orderItem: TOrderItem }> = ({ orderItem }) => (
  <li className={styles.orderInfoListItem}>
    <div className={styles.orderInfoListItemImgWrap}>
      <img src={orderItem.img} alt="" />
    </div>
    <div className={styles.orderInfoListName}>{orderItem.name}</div>
    <Price priceValue={`${orderItem.qty} x ${orderItem.price}`} extraClass={styles.orderInfoListPrice} />
  </li>
);

const OrderInfo = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const orderInfo = useAppSelector((state) => state.orderInfo);
  const order = orderInfo.data?.orders[0];
  const ingsAll = useAppSelector(getIngredients);

  useEffect(() => {
    id && orderInfo.status === 'idle' && dispatch(loadOrderInfo(id));
    return () => {
      dispatch(emptyOrderInfo());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if(!order) return null;

  let orderIngs: { [_id: string]: TOrderItem } = {}, priceTotal = 0;
  Array.from(new Set(order.ingredients)).forEach((_id) => {
    const ing = ingsAll.find(el => el._id === _id);
    if (!ing) return;
    orderIngs[_id] = {
      qty: order.ingredients.filter(el => el === _id).length,
      img: ing.image_mobile,
      name: ing.name,
      price: ing.price,
    };
    priceTotal += orderIngs[_id].qty * orderIngs[_id].price;
  });

  return (
    <div className={styles.orderInfo}>
      <h1 className={styles.orderInfoNumber}>#{order.number}</h1>
      <h2 className={styles.orderInfoName}>{order.name}</h2>
      <h3 className={styles.orderInfoStatus}>{DICTIONARY(order.status)}</h3>
      <h4 className={styles.orderInfoIngredients}>Состав:</h4>
      <ul className={`${styles.orderInfoList} custom-scroll`}>
        {Object.keys(orderIngs).map((item) => <OrderInfoItem key={item} orderItem={orderIngs[item]} />)}
      </ul>
      <div className={styles.orderInfoTimePrice}>
        <FormattedDate date={new Date(order.updatedAt)} className="text_color_inactive" />
        <Price priceValue={priceTotal} />
      </div>
    </div>
  );
};

export default OrderInfo;
