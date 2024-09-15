import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  payment: string;
}

interface OrderContextType {
  orderDetails: OrderDetails;
  updateOrderDetails: (field: string, value: string) => void;
  clearOrderDetails: () => void;
}

const OrderContext = createContext < OrderContextType | undefined > (undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState < OrderDetails > ({
    name: "",
    phone: "",
    address: "",
    payment: "cash",
  });

  const updateOrderDetails = (field: string, value: string) => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const clearOrderDetails = () => {
    setOrderDetails({
      name: "",
      phone: "",
      address: "",
      payment: "cash",
    });
  };

  return (
    <OrderContext.Provider value={{ orderDetails, updateOrderDetails, clearOrderDetails }}>
      {children}
    </OrderContext.Provider>
  );
};

// Пользовательский хук для использования контекста
export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
