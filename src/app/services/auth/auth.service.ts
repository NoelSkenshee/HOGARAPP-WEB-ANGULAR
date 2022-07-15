import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Regist } from 'src/app/Utils/types/regist';
import { httpResponse } from 'src/app/Utils/types/responseHttp';
import services from 'src/app/Utils/tools';
import { Login } from '../../Utils/types/login';
const { registMongo, registSQL,loginMongo,loginSQL,verifySQL,verifyMongo} = services.services.auth;
const {LOGIN_MONGO,LOGIN_SQL,LOGUP_MONGO,LOGUP_SQL,VERIFY_MONGO,VERIFY_SQL}=services.services.methods

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private net: HttpClient) {}

  [LOGUP_SQL](payload: Regist) {
    return this.net.post<httpResponse>(registSQL, payload).pipe();
  }
  [LOGUP_MONGO](payload: Regist) {
    return this.net.post<httpResponse>(registMongo, payload).pipe();
  }

  [LOGIN_SQL](payload: Login) {
    return this.net.post<httpResponse>(loginSQL, payload).pipe();
  }
  [LOGIN_MONGO](payload: Login) {
    return this.net.post<httpResponse>(loginMongo, payload).pipe();
  }

  /** */
   [VERIFY_SQL](token:string){

    return this.net.get<httpResponse>(verifySQL(token)).pipe();

   }

   [VERIFY_MONGO](token:string){

    return this.net.get<httpResponse>(verifyMongo(token)).pipe();

   }



}
