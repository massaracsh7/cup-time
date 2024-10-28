import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { API_URL } from '../const';
import { Product } from '../types';

// Определение типа для контекста
interface ProductContextType {
  products: Product[];
  setCategory: (category: string) => void;
}

// Создание контекста с типом по умолчанию
const ProductContext = createContext < ProductContextType | undefined > (undefined);

interface ProductProviderProps {
  children: ReactNode;
}

const wakeUpAPI = async () => {
  let attempt = 0;
  while (attempt < 10) {
    try {
      await fetch('https://cup-time-api-ww8l.onrender.com/api/products');
      console.log('Ok, API is awake');
      return;
    } catch (error) {
      attempt++;
      console.error(`Loading..., API is not awake`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  window.location.reload();
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState < Product[] > ([]);
  const [category, setCategory] = useState < string > ("");

  useEffect(() => {
    const fetchProducts = async () => {
      await wakeUpAPI();
      if (category) {
        try {
          const response = await fetch(`${API_URL}/api/products/${category}`);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const data: Product[] = await response.json();
          setProducts(data);
        } catch (error) {
          console.error(`Error fetching products`);
        }
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <ProductContext.Provider value={{ products, setCategory }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
