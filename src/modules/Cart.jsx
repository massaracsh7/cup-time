import { products } from "../products"
import { CartItem } from "./CartItem"

export const Cart = () => {
  return (
    <section className="cart">
      <div className="container cart__container ">
        <h2 className="cart__title">Корзина <span className="cart__title-num">6</span></h2>
        <ul className="cart__list">
          {products.map((item) => (
            <CartItem key={item.id} data={item} />
          ))}
        </ul>
        <div className="cart__summary">
          <h3 className="cart__summary-title">Итого </h3>
          <p className="cart__total">2200 ₽</p>
          <button className="cart__button" type="submit">Заказать</button>
        </div>
      </div>
    </section>
  )
}