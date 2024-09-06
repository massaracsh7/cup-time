import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import React from 'react';
import style from './Header.module.scss';

export const Header: React.FC = () => {
  const location = useLocation();
  const { cart } = useCart();
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const closeMenu = () => {
    setIsOpenMenu(false);
  };

  const openMenu = () => {
    setIsOpenMenu(true);
  };

  const categories: string[] = ['tea', 'coffee', 'teapots', 'cezves', 'other'];

  useEffect(() => {
    if (isOpenMenu) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpenMenu]);

  const getActiveClass = (category: string): string => {
    const currentCategory = new URLSearchParams(location.search).get('category');
    return currentCategory === category ? 'active' : "";
  };

  return (
    <header className={style.header}>
      <div className="flex__container">
        <Link to="/" className={style.header__logo_link}>
          <img src="image/logo.svg" alt="Логотип Cup Time" className={style.header__logo} />
        </Link>
        <nav className={`${style.header__nav} ${isOpenMenu ? style.active : ''}`}>
          <ul className={`${style.header__menu} flex_container}`}>
            {categories.map((category) => (
              <li key={category} className={style.header__menu_item}>
                <Link
                  className={`${style.header__menu_link} ${getActiveClass(category)}`}
                  to={`/products?category=${category}`}
                  onClick={closeMenu}
                >
                  {category === 'tea' ? 'Чай' :
                    category === 'coffee' ? 'Кофе' :
                      category === 'teapots' ? 'Чайники' :
                        category === 'cezves' ? 'Турки' : 'Прочее'}
                </Link>
              </li>
            ))}
          </ul>
          <button className={style.header__close_btn} onClick={closeMenu} aria-label="Закрыть меню">
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.28" y="0.08" width="20" height="1" transform="rotate(45 1.28 0.08)" fill="#D9D9D9" />
              <rect x="0.58" y="14.22" width="20" height="1" transform="rotate(-45 0.58 14.22)" fill="#D9D9D9" />
            </svg>
          </button>
        </nav>
        <Link className={style.header__cart_link} to="/cart">
          {cart?.length || 0}
        </Link>
        <div className={style.burger} aria-label="Открыть меню" onClick={openMenu}>
          <span className={style.burger__line}></span>
        </div>
      </div>
    </header>
  );
};
