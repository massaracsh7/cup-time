import { useState, MouseEvent } from "react";
import { ProductModal } from "../ProductModal/ProductModal";
import style from './Product.module.scss';
import { API_URL } from "../../const";
import { AdditionalInfo } from "../../types";

interface ProductProps {
  data: {
    id: number;
    title: string;
    img: string;
    price: number;
    additional: AdditionalInfo;
  };
}

export const Product: React.FC<ProductProps> = ({ data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <li className={style.products__item}>
      <a
        className={style.product__link}
        href="#"
        onClick={openModal}
        aria-label={`Модальное окно для ${data.title}`}
      >
        <article className={style.product}>
          <img
            src={`${API_URL}${data.img}`}
            alt={data.title}
            className={style.product__image}
          />
          <div className={style.product__content}>
            <h3 className={style.product__title}>{data.title}</h3>
            <p className={style.product__price}>{data.price} ₽</p>
          </div>
        </article>
      </a>
      <ProductModal isOpen={modalIsOpen} onRequestClose={closeModal} data={data} />
    </li>
  );
};
