import React from 'react';
import style from './Promo.module.scss'; 
import { Link } from 'react-router-dom';

export const Promo: React.FC = () => {
  return (
    <section className={style.promo}>
      <div className="container">
        <div className={style.promo__container}>
          <h1 className={style.promo__title}>Попробуй новый вкус Арабики</h1>
          <Link to="/products?category=coffee" className={style.promo__link}>
            Перейти к кофе
          </Link>
        </div>
      </div>
    </section>
  );
};
