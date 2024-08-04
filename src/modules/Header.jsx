import { Link, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export const Header = () => {
  const location = useLocation();
  const { cart } = useCart();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const closeMenu = () => {
    setIsOpenMenu(false);
  }
  const openMenu = () => {
    setIsOpenMenu(true);
  }

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

  const getActiveClass = (category) => {
    const currentCategory = new URLSearchParams(location.search).get('category');
    return currentCategory === category ? 'active' : "";
  }
  return (

    <header className="header">
      <div className="flex__container">
        <Link to="/" className="header__logo-link">
          <img src="image/logo.svg" alt="Логотип Cup Time" className="header__logo" />
        </Link>
        <nav className={`header__nav ${isOpenMenu ? "active" : ""}`}>
          <ul className="header__menu  flex__container">
            <li className="header__menu-item">
              <Link className={`header__menu-link ${getActiveClass('tea')}`} to="/products?category=tea" onClick={closeMenu}>Чай</Link>
            </li>
            <li className="header__menu-item">
              <Link className={`header__menu-link ${getActiveClass('coffee')}`} to="/products?category=coffee" onClick={closeMenu}>Кофе</Link>
            </li>
            <li className="header__menu-item">
              <Link className={`header__menu-link ${getActiveClass('teapots')}`} to="/products?category=teapots" onClick={closeMenu}>Чайники</Link>
            </li>
            <li className="header__menu-item">
              <Link className={`header__menu-link ${getActiveClass('cezves')}`} to="/products?category=cezves" onClick={closeMenu}>Турки</Link>
            </li>
            <li className="header__menu-item">
              <Link className={`header__menu-link ${getActiveClass('other')}`} to="/products?category=other" onClick={closeMenu}>Прочее</Link>
            </li>
          </ul>
          <button className="header__close-btn" onClick={closeMenu}><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.28174" y="0.0753174" width="20" height="1" transform="rotate(45 1.28174 0.0753174)" fill="#D9D9D9" />
            <rect x="0.575195" y="14.2173" width="20" height="1" transform="rotate(-45 0.575195 14.2173)" fill="#D9D9D9" />
          </svg>
          </button>
        </nav>
        <Link className="header__cart-link" to="cart">{cart !== null ? cart.length : 0}</Link>
        <div className="burger" aria-label='Открыть меню' onClick={openMenu}><span className="burger__line"></span></div>
      </div>
    </header>
  )
}