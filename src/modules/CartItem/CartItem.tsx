import { useState } from "react";
import { API_URL } from "../../const";
import { useCart } from "../../context/CartContext";
import style from './CartItem.module.scss';

interface CartItemProps {
  data: {
    id: number;
    title: string;
    quantity: number;
    price: number;
    img: string;
  };
}

export const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const [itemQuantity, setItemQuantity] = useState < number > (data.quantity);
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    const newQuantity = itemQuantity - 1;
    if (newQuantity > 0) {
      setItemQuantity(newQuantity);
      updateQuantity(data.id, newQuantity);
    } else {
      removeFromCart(data.id);
    }
  };

  const handleIncrease = () => {
    const newQuantity = itemQuantity + 1;
    setItemQuantity(newQuantity);
    updateQuantity(data.id, newQuantity);
  };

  return (
    <li className={style.cart}>
      <img src={`${API_URL}${data.img}`} alt={data.title} className={style.cart__image} />
      <div className={style.cart__info}>
        <h3 className={style.cart__title}>{data.title}</h3>
        <div className={style.cart__quantity}>
          <button className={style.cart__button} onClick={handleDecrease}>-</button>
          <input className={style.cart__input} type="number" value={itemQuantity} readOnly />
          <button className={style.cart__button} onClick={handleIncrease}>+</button>
        </div>
        <p className={style.cart__price}>{data.price * data.quantity}&nbsp;₽</p>
      </div>
    </li>
  );
};
