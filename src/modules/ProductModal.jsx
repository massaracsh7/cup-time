import Modal from 'react-modal';
import { API_URL } from '../const';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: "translate(-50%, -50%)",
  },
}

export const ProductModal = ({ isOpen, onRequestClose, data }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  if (!data) {
    return null;
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addToCart(data, quantity);
    console.log(data);
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel='ProductModal'>
      <div className="modal__wrapper">
        <img className="modal__img" src={`${API_URL}${data.img}`} alt={data.title} />
        <div className="modal__info">
          <h2 className="modal__title">{data.title}</h2>

          <p className="modal__price">{data.price}&nbsp;₽</p>
          <ul className="modal__list">
            {Object.entries(data.additional).map(([key, value]) => (
              <li key={key} className="flex__container modal__add">
                <span>{key}:</span> {value}
              </li>
            ))}
          </ul>

          <div className="modal__bottom flex__container">
            <div className="cart-item__quantity modal__quantity">
              <button className="cart-item__quantity-button cart-item__quantity-button_minus" onClick={handleDecrease}>-</button>
              <input className="cart-item__quantity-input" type='number' value={quantity} />
              <button className="cart-item__quantity-button cart-item__quantity-button_plus" onClick={handleIncrease}>+</button>
            </div>
            <button className="modal__btn" onClick={handleAddToCart}>Добавить</button>
          </div>
          <button onClick={onRequestClose} className="modal__close">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3.71228" y="12.1975" width="12" height="1.5" transform="rotate(-45 3.71228 12.1975)" fill="#B8B8B8" />
              <rect x="12.1976" y="13.2582" width="12" height="1.5" transform="rotate(-135 12.1976 13.2582)" fill="#B8B8B8" />
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  )
}