import { useState } from "react";
import { useCart } from "../context/CartContext";
import { CartItem } from "./CartItem"
import { SkeletonLoader } from "./SkeletonLoader";
import { useOrder } from "../context/OrderContext";
import { API_URL } from "../const";
import Modal from 'react-modal';
Modal.setAppElement('#root');
export const Cart = () => {
  const [orderStatus, setOrderStatus] = useState();
  const [orderId, setOrderId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { cart, clearCart } = useCart();
  const { orderDetails, clearOrderDetails } = useOrder();

  const handleSubmit = async () => {
    const orderData = {
      ...orderDetails,
      items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
    };
    try {
      const response = await fetch(`${API_URL}/api/orders/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData),
      })
      if (!response.ok) {
        throw new Error('Ошибка при отправке заказа');
      }

      const result = await response.json();
     
      setOrderStatus('success');
      setOrderId(result.message);
      clearCart();
      clearOrderDetails();
    } catch (error) {
      setOrderStatus('error');
      console.log(`Ошибка: ${error}`);
    } finally {
      setModalIsOpen(true);
    }
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const totalPrice = cart ? cart.reduce((acc, item) =>
    item.quantity * item.price + acc
    , 0) : 0;
  return (
    <section className="cart">
      <div className="container cart__container ">
        <h2 className="cart__title">Корзина <span className="cart__title-num">{cart !== null ? cart.length : 0}</span></h2>
        <ul className="cart__list">
          {cart ? cart.map((item) => (
            <CartItem key={item.id} data={item} />
          )) : (
            <SkeletonLoader />
          )}
        </ul>
        <div className="cart__summary">
          <h3 className="cart__summary-title">Итого </h3>
          <p className="cart__total">{totalPrice}&nbsp;₽</p>
          <button className="cart__button" onClick={handleSubmit}>Заказать</button>
        </div>
      </div>
      <Modal
        className='modal-cart'
        onRequestClose={closeModal}
        isOpen={modalIsOpen}
      >
        <div className="modal-cart__wrapper">

        <h2>
          {orderStatus === 'success' ?
            `${orderId}` :
            'Error'
          }
        </h2>
        <button className="modal-cart__btn" onClick={closeModal}>Закрыть</button>
        </div>
      </Modal>
    </section>
  )
}