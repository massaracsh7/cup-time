import { ChangeEvent } from "react";
import { useOrder } from "../../context/OrderContext";
import style from './Order.module.scss';


export const Order = () => {
  const { orderDetails, updateOrderDetails } = useOrder();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateOrderDetails(name, value);
  };

  return (
    <section className={style.order}>
      <div className="container">
        <h2 className={style.order__title}>Доставка</h2>
        <form className={style.order__form}>
          <input
            className={style.order__input}
            type="text"
            id="name"
            name="name"
            placeholder="Имя"
            value={orderDetails.name || ""}
            onChange={handleChange}
          />
          <input
            className={style.order__input}
            type="text"
            id="phone"
            name="phone"
            placeholder="Телефон"
            value={orderDetails.phone || ""}
            onChange={handleChange}
          />
          <input
            className={`${style.order__input} ${style.order__input_address}`}
            type="text"
            id="address"
            name="address"
            placeholder="Адрес"
            value={orderDetails.address || ""}
            onChange={handleChange}
          />

          <fieldset className={style.order__payment}>
            <legend className={style.order__payment_title}>Оплата</legend>
            <label className={style.order__payment_label}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={orderDetails.payment === "card"}
                onChange={handleChange}
              />
              Картой
            </label>
            <label className={style.order__payment_label}>
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={orderDetails.payment === "cash"}
                onChange={handleChange}
              />
              Наличные
            </label>
          </fieldset>
        </form>
      </div>
    </section>
  );
};
