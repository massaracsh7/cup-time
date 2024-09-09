import React from 'react';
import style from './Promo.module.scss'; 

export const Promo: React.FC = () => {
  return (
    <section className={style.promo}>
      <div className="container">
        <div className={style.promo__container}>
          <h1 className={style.promo__title}>Попробуй новый вкус Арабики</h1>
          <a href="#" className={style.promo__link}>Перейти к кофе</a>
        </div>
      </div>
    </section>
  );
};
