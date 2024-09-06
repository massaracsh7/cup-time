import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "../types";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[] | null;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext < CartContextType | undefined > (undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState < CartItem[] | null > (null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (cart !== null) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: Product, quantity: number) => {
    const newCart = cart ? [...cart] : [];
    const itemIndex = newCart.findIndex(item => item.id === product.id);
    if (itemIndex >= 0) {
      newCart[itemIndex].quantity += quantity;
    } else {
      newCart.push({ ...product, quantity });
    }
    setCart(newCart);
  };

  const updateQuantity = (productId: number, quantity: number) => {
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

  const removeFromCart = (productId: number) => {
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

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
