import { CartItem } from './cart-item.model';

export interface Cart {
  id: string;
  userId: number;
  items: CartItem[];
  date: string;
  status: string;
}
