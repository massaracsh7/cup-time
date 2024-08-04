/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (cart !== null && Array.isArray(cart)) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product, quantity) => {
    const newCart = cart ? [...cart] : [];
    const itemIndex = newCart.findIndex(item => item.id === product.id);
    if (itemIndex >= 0) {
      newCart[itemIndex].quantity += quantity;
    } else {
      newCart.push({ ...product, quantity });
    }
    setCart(newCart);
  };

  const updateQuantity = (productId, quantity) => {
    if (cart) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        setCart(
          cart.map(item => (item.id === productId ? { ...item, quantity } : item))
        );
      }
    }
  };

  const clearCart = () => {
    setCart([]);
  }

  const removeFromCart = (productId) => {
    if (cart) {
      setCart(cart.filter((item) => item.id !== productId));
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
