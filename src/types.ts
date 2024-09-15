export interface Product {
  id: number;
  title: string;
  img: string;
  price: number;
  additional: AdditionalInfo;
}

export interface AdditionalInfo {
  [key: string]: string;
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
