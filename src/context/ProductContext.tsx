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

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState < Product[] > ([]);
  const [category, setCategory] = useState < string > ("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (category) {
        try {
          const response = await fetch(`${API_URL}/api/products/${category}`);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const data: Product[] = await response.json();
          setProducts(data);
        } catch (error) {
          console.error(`Error fetching products: ${error.message}`);
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
