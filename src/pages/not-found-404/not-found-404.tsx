import { useAppSelector } from '../../hooks/store-hooks';
import { getIngredients } from '../../services/slices/burger-ingredients';
import styles from './not-found-404.module.css';

const NotFound404Page = () => {
  const ingredients = useAppSelector(getIngredients);
  const imgs = ingredients.map(el => el.image).sort(() => 0.5 - Math.random()).slice(0, 9);

  return (
    <main className={`${styles.notFound} text text_type_digits-medium`}>
      error
      <p className='text text_type_digits-large'>404</p>
      page not found

      {imgs.map(img => (
        <div key={img} className={styles.notFoundImgWrap}>
          <img src={img} alt='' />
        </div>
      ))}
    </main>
  );
};

export default NotFound404Page;
