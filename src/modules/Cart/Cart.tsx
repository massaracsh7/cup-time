import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader";
import { useOrder } from "../../context/OrderContext";
import { API_URL } from "../../const";
import Modal from 'react-modal';
import style from './Cart.module.scss';
import { CartItem } from "../CartItem/CartItem";

interface CartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
  img: string;
}

interface OrderResponse {
  message: string;
}

Modal.setAppElement('#root');

export const Cart = () => {
  const [orderStatus, setOrderStatus] = useState < string | undefined > ();
  const [orderId, setOrderId] = useState < string | null > (null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { cart, clearCart } = useCart();
  const { orderDetails, clearOrderDetails } = useOrder();

  const handleSubmit = async () => {
    const orderData = {
      ...orderDetails,
      items: cart?.map(item => ({ id: item.id, quantity: item.quantity })),
    };

    try {
      const response = await fetch(`${API_URL}/api/orders/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке заказа');
      }

      const result: OrderResponse = await response.json();
      setOrderStatus('success');
      setOrderId(result.message);
      clearCart();
      clearOrderDetails();
    } catch (error) {
      setOrderStatus('error');
      console.error(`Ошибка: ${error}`);
    } finally {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const totalPrice = cart ? cart.reduce((acc, item) =>
    item.quantity * item.price + acc
    , 0) : 0;

  return (
    <section className={style.cart}>
      <div className={`${style.cart__container} container`}>
        <h2 className={style.cart__title}>
          Корзина <span className={style.cart__title_num}>{cart ? cart.length : 0}</span>
        </h2>
        <ul className={style.cart__list}>
          {cart ? cart.map((item: CartItem) => (
            <CartItem key={item.id} data={item} />
          )) : (
            <SkeletonLoader />
          )}
        </ul>
        <div className={style.cart__summary}>
          <h3 className={style.cart__summary_title}>Итого</h3>
          <p className={style.cart__total}>{totalPrice}&nbsp;₽</p>
          <button className={style.cart__button} onClick={handleSubmit}>Заказать</button>
        </div>
      </div>
      <Modal
        className={style.modal}
        onRequestClose={closeModal}
        isOpen={modalIsOpen}
      >
        <div className={style.modal__wrapper}>
          <h2>
            {orderStatus === 'success' ? orderId : 'Error'}
          </h2>
          <button className={style.modal__btn} onClick={closeModal}>Закрыть</button>
        </div>
      </Modal>
    </section>
  );
};
