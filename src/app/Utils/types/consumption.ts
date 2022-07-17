export type Consumption = {
  product: string;
  image: string;
  date: string;
  quantity: number;
};

export type ConsumptionRes ={
  error:boolean
  data:Consumption[]
  message:string
}
