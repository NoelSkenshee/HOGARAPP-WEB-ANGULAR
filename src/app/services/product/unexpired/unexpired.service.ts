import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../Utils/types/product';
import { httpResponse } from '../../../Utils/types/responseHttp';
import tools from "../../../Utils/tools"
const {productSQL}=tools.services.product;
import services from 'src/app/Utils/tools';
const {NEW_PRODUCT_SQL,LIST_UNXPIRED_SQL}=services.services.methods
@Injectable({
  providedIn: 'root'
})
export class UnexpiredService {

  constructor(private net:HttpClient) { }

  [NEW_PRODUCT_SQL](token:string,product:any){
   return this.net.post<httpResponse>(productSQL(token),product).pipe()
  }

  [LIST_UNXPIRED_SQL](token:string){
    return this.net.get<httpResponse>(productSQL(token)).pipe()
   }


}
