import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import tools from 'src/app/Utils/tools';
import { httpResponse } from '../../Utils/types/responseHttp';
import { Tmessage } from '../../Utils/types/Tmessages';
const {messages}=tools.services
const {SEND_MESSAGE}=tools.services.methods
@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private net:HttpClient) { }

  [SEND_MESSAGE](session:string,data:Tmessage){
    return this.net.post<httpResponse>(messages.sendMessage(session),data).pipe()
  }
}
