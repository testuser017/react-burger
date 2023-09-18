import { useAppSelector } from '../../hooks/store-hooks';
import { getIngredientsData } from '../../services/slices/burger-ingredients';
import styles from './not-found-404.module.css';

const NotFound404Page = () => {
  const ingredients = useAppSelector(getIngredientsData);
  const imgs = ingredients.map(el => el.image).sort(() => 0.5 - Math.random()).slice(0, 9);

  return (
    <main className={`${styles.notFound} text text_type_digits-medium`}>
      error
      <p className='text text_type_digits-large'>404</p>
      page not found

      {imgs.map(img => <img src={img} key={img} alt='' />)}
    </main>
  );
};

export default NotFound404Page;
