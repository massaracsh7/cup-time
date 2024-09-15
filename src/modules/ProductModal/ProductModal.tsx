import Modal from 'react-modal';
import { API_URL } from '../../const';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import style from './ProductModal.module.scss';
import { AdditionalInfo } from '../../types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: "translate(-50%, -50%)",
  },
};

interface ProductData {
  id: number;
  img: string;
  title: string;
  price: number;
  additional: AdditionalInfo;
}

interface ProductModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  data: ProductData;
}

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onRequestClose, data }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!data) {
    return null;
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(data, quantity);
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel='ProductModal'>
      <div className={style.modal__wrapper}>
        <img className={style.modal__img} src={`${API_URL}${data.img}`} alt={data.title} />
        <div className={style.modal__info}>
          <h2 className={style.modal__title}>{data.title}</h2>
          <p className={style.modal__price}>{data.price}&nbsp;₽</p>
          <ul className={style.modal__list}>
            {Object.entries(data.additional).map(([key, value]) => (
              <li key={key} className={`${style.modal__add} flex__container`}>
                <span>{key}:</span> {value}
              </li>
            ))}
          </ul>
          <div className={`${style.modal__bottom} flex_container`}>
            <div className={style.modal__quantity}>
              <button className={`${style.modal__quantity_button} ${style.modal__quantity_minus}`} onClick={handleDecrease}>-</button>
              <input className={style.modal__quantity_input} type='number' value={quantity} readOnly />
              <button className={`${style.modal__quantity_button} ${style.modal__quantity_plus}`} onClick={handleIncrease}>+</button>
            </div>
            <button className={style.modal__btn} onClick={handleAddToCart}>Добавить</button>
          </div>
          <button onClick={onRequestClose} className={style.modal__close}>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3.71228" y="12.1975" width="12" height="1.5" transform="rotate(-45 3.71228 12.1975)" fill="#B8B8B8" />
              <rect x="12.1976" y="13.2582" width="12" height="1.5" transform="rotate(-135 12.1976 13.2582)" fill="#B8B8B8" />
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
};
