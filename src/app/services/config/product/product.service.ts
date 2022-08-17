import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import tools from 'src/app/Utils/tools';
import { httpResponse } from '../../../Utils/types/responseHttp';
import { TconfigProduct } from '../../../Utils/types/TconfigProduct';
const {CONFIG_PRODUCT,GET_CONFIG_PRODUCT}=tools.services.methods;
const {config}=tools.services.config_product;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private net:HttpClient) { }

  [CONFIG_PRODUCT](token:string,configBody:TconfigProduct){
    return  this.net.post<httpResponse>(config(token),configBody).pipe()
  }

 [GET_CONFIG_PRODUCT](token:string){
    return  this.net.get<httpResponse>(config(token)).pipe()
  }

}
