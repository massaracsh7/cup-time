import { Navigate, Route, Routes } from "react-router-dom";
import { Products } from "../Products/Products";
import { Promo } from "../Promo/Promo";
import { Cart } from "../Cart/Cart";
import { Order } from "../Order/Order";

export const Main: React.FC = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Navigate to="/products?category=tea" />} />
        <Route
          path="/products"
          element={
            <>
              <Promo />
              <Products />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Cart />
              <Order />
            </>
          }
        />
      </Routes>
    </main>
  );
};
