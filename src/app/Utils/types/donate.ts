import { Product } from './product';
export type post_donate = {
  product: Product;
  quantity: number;
  destination: string;
};

export type donation = {
  id: number;
  user: number;
  product: number;
  name:string;
  image: string;
  destination: string;
  date: string;
  expiry_date: string;
  quantity: string;
  unit: string;
};
