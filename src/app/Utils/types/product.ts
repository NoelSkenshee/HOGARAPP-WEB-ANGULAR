export type Product={
  id:any,
  _id:any,
  product: string;
  category: string;
  createdAt: Date;
  expiryDate: Date;
  total: number;
  quantity: number;
  unit: string;
  price: number;
  image?:File,
  alt:string
  consumption:number,
  newconsumption:number,
  donate:number
}
