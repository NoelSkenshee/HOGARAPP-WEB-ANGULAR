import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../Utils/types/product';
import { httpResponse } from '../../../Utils/types/responseHttp';
import tools from "../../../Utils/tools"
const {productSQL}=tools.services.product;


@Injectable({
  providedIn: 'root'
})
export class ExpiredService {

  constructor(private net:HttpClient) { }

  newProduct(token:string,product:Product){
   return this.net.post<httpResponse>(productSQL(token),product).pipe()
  }



  listProduct(token:string){
    return this.net.get<httpResponse>(productSQL(token)).pipe()
   }




}
