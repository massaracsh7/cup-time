import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProductProvider } from './context/ProductContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Modal from 'react-modal';
import { OrderProvider } from './context/OrderContext.jsx'

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>,
)
