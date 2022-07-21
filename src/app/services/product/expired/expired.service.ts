import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpResponse } from '../../../Utils/types/responseHttp';
import tools from "../../../Utils/tools"
import { post_donate } from '../../../Utils/types/donate';
import { Product } from '../../../Utils/types/product';
const {productEXPSQL}=tools.services.product;
const {donate,trash}=tools.services.expiry;
import services from 'src/app/Utils/tools';
const {LIST_DONATE_SQL,INSERT_DONATE_SQL,TO_TRASH_SQL,LIST_EXPIRED_SQL}=services.services.methods


@Injectable({
  providedIn: 'root'
})
export class ExpiredService {

  constructor(private net:HttpClient) { }

  [LIST_EXPIRED_SQL](token:string){
    return this.net.get<httpResponse>(productEXPSQL(token)).pipe()
   }


   [INSERT_DONATE_SQL](token:string,donation:post_donate){
      if(!donation.product.id)donation.product.id=donation.product._id;
       return this.net.post<httpResponse>(donate(token),donation).pipe()
      }


      [LIST_DONATE_SQL](token:string){
    return this.net.get<httpResponse>(donate(token)).pipe()
   }

   [TO_TRASH_SQL](token:string,product:Product){
    if(!product.id)product.id=product._id;
    return this.net.put<httpResponse>(trash(token),product).pipe()
   }

}
