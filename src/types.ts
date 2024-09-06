export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
}

export interface Order {
  name: string;
  phone: string;
  address: string;
  items: OrderItem[];
}

export interface OrderResponse {
  message: string;
  order: Order;
}
