import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import tools from "../../Utils/tools"
import { ConsumptionRes, Consumption } from '../../Utils/types/consumption';
import { Product } from '../../Utils/types/product';
import {tap} from "rxjs/operators"
import {of} from "rxjs"

const {consumption,ENOUGH}=tools.services.consumption
const route=consumption;
import services from 'src/app/Utils/tools';
const {LIST_CONSUMPTION_SQL,INSERT_CONSUMPTION_SQL}=services.services.methods
@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {

  constructor(private net:HttpClient) { }

   [LIST_CONSUMPTION_SQL](token:string){
        return this.net.get(consumption(token)).pipe(tap(async (res:any)=>{
          res["averages"]= this.unrepeatedProduct(res.data)
          return res
        })).pipe()
  }

  [INSERT_CONSUMPTION_SQL]({consumption,quantity,newconsumption,id}:Product,token:string){
    if(quantity-consumption<newconsumption)return of({error:true,message:ENOUGH,data:null}).pipe()
    return this.net.post(route(token),{product:id,quantity:newconsumption}).pipe()
  }


  unrepeatedProduct(list_product:Consumption[]){
         const unrepeatedProducts:any={};
         list_product.map((p)=>{
          if(unrepeatedProducts[p.product]){
            unrepeatedProducts[p.product]["repeat"]+=1;
            unrepeatedProducts[p.product]["foraverage"]+=p.quantity;
          }else {
             unrepeatedProducts[p.product]=p
             unrepeatedProducts[p.product]["repeat"]=1
             unrepeatedProducts[p.product]["foraverage"]=p.quantity;
            }
        })
         return unrepeatedProducts;
        }





}
