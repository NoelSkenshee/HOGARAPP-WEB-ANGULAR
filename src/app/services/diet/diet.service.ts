import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tdiet, TresponseDiet } from '../../Utils/types/Tdiet';
import tools from 'src/app/Utils/tools';
const {dietSql}=tools.services.diet;
const {INSERT_DIET,LIST_DIET,PROGRESS_DAY_DIET}=tools.services.methods;


@Injectable({
  providedIn: 'root'
})
export class DietService {

  constructor(private net:HttpClient) { }

   [INSERT_DIET](token:string,diet:Tdiet){
     return this.net.post<TresponseDiet>(dietSql(token),diet).pipe()
   }

   [LIST_DIET](token:string){
    return this.net.get<TresponseDiet>(dietSql(token)).pipe()
  }

  [PROGRESS_DAY_DIET](token:string,diet:Tdiet){
    return this.net.put<TresponseDiet>(dietSql(token),diet).pipe()
  }


}
