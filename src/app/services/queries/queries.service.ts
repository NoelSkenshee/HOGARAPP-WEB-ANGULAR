import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import tools from 'src/app/Utils/tools';
import { httpResponse } from '../../Utils/types/responseHttp';
const {query}=tools.services.queries;
const {REMAINING,DURATION,WAST,CONSUMPTIOND,RECOMENDATION,AVERAGE}=tools.services.methods

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  constructor(private net:HttpClient) { }

 [REMAINING](token:string,product:string){
  return this.net.get<httpResponse>(query("remaining",token,`product=${product}`)).pipe()
 }

 [DURATION](token:string,expiryDate:Date){
   return  this.net.get<httpResponse>(query("durationsdays",token,`expiryDate=${expiryDate}`)).pipe()
 }
 [WAST](token:string,product:string,quantity:number,expiryDate:Date){
  return this.net.get<httpResponse>(query("wast",token,`product=${product}&expiryDate=${expiryDate}&quantity=${quantity}`)).pipe()
 }
 [CONSUMPTIOND](token:string,product:string,quantity:number,expiryDate:Date){

  return this.net.get<httpResponse>(query("consumptiondays",token,`product=${product}&expiryDate=${expiryDate}&quantity=${quantity}`)).pipe()
 }
 [RECOMENDATION](token:string,product:string,quantity:number,expiryDate:Date){

  return this.net.get<httpResponse>(query("recomendation",token,`product=${product}&expiryDate=${expiryDate}&quantity=${quantity}`)).pipe()
 }
 [AVERAGE](token:string,product:string){

  return this.net.get<httpResponse>(query("average",token,`product=${product}`)).pipe()
 }

}
