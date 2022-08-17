import { Injectable } from '@angular/core';
import tools from 'src/app/Utils/tools';
import { HttpClient } from '@angular/common/http';
import { TconfigDiet } from '../../../Utils/types/TconfigDiet';
import { httpResponse } from '../../../Utils/types/responseHttp';
const {CONFIG_DIET,GET_CONFIG_DIET}=tools.services.methods;
const {config}=tools.services.config_diet;
@Injectable({
  providedIn: 'root'
})
export class DietConfigService {
  constructor(private net:HttpClient) { }

  [CONFIG_DIET](token:string,configBody:TconfigDiet){
    return  this.net.post<httpResponse>(config(token),configBody).pipe()
  }

 [GET_CONFIG_DIET](token:string){
    return  this.net.get<httpResponse>(config(token)).pipe()
  }
}
