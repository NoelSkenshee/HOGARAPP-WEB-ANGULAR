export type Consumption = {
  product: string;
  image: string;
  date: string;
  quantity: number;
  foraverage:number,
  repeat:number
  unit:string
};

export type ConsumptionRes ={
  error:boolean
  data:Consumption[]
  message:string
}
