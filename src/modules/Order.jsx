export const Order = () => {
  return (
    <section className="order">
      <div className="container">
        <h2 className="order__title">Доставка</h2>
        <form className="order__form">
          <input className="order__input" type="text" id="name" name="name" placeholder="Имя" />
          <input className="order__input" type="text" id="phone" name="phone" placeholder="Телефон" />
          <input className="order__input order__input_address" type="text" id="address" name="address" placeholder="Адрес" />

          <fieldset className="order__payment">
            <legend className="order__payment-title">Оплата</legend>
            <label className="order__payment-label"><input type="radio" name="payment" value="card" />Картой</label>
            <label className="order__payment-label"><input type="radio" name="payment" value="cash" defaultChecked />Наличные</label>
          </fieldset>
        </form>
      </div>
    </section>
  )
}