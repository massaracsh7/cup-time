import { Link } from "react-router-dom"

export const Header = () => {
  return (

    <header className="header">
      <div className="flex__container">
        <Link to="/" className="header__logo-link">
          <img src="image/logo.svg" alt="Логотип Cup Time" className="header__logo" />
        </Link>
        <nav className="header__nav">
          <ul className="header__menu  flex__container">
            <li className="header__menu-item">
              <a className="header__menu-link" href="">Чай</a>
            </li>
            <li className="header__menu-item">
              <a className="header__menu-link" href="">Кофе</a>
            </li>
            <li className="header__menu-item">
              <a className="header__menu-link" href="">Чайники</a>
            </li>
            <li className="header__menu-item">
              <a className="header__menu-link" href="">Турки</a>
            </li>
            <li className="header__menu-item">
              <a className="header__menu-link" href="">Прочее</a>
            </li>
          </ul>
        </nav>
        <Link className="header__cart-link" to="cart">6</Link>
        <div className="burger"><span className="burger__line"></span></div>
      </div>
    </header>
  )
}