import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import tools from 'src/app/Utils/tools';
import { passwordChange } from '../../Utils/types/Tpassword';
import { httpResponse } from '../../Utils/types/responseHttp';
const {CHANGE_PASSWORD,VERIFY_PASSWORD_CHANGE,PASSWORD_STATUS}=tools.services.methods;
const {verify,change,status}=tools.services.password;

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private net:HttpClient) { }
   [CHANGE_PASSWORD](data:passwordChange){
    return this.net.put<httpResponse>(change(),data).pipe()
   }
   [PASSWORD_STATUS](session:string){
    return this.net.get<httpResponse>(status(session)).pipe()
   }
   [VERIFY_PASSWORD_CHANGE](session:string){
    return this.net.get<httpResponse>(verify(session)).pipe()
   }
}
