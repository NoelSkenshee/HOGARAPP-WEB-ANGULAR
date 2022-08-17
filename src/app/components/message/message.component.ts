import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import tools from 'src/app/Utils/tools';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MessagesService } from '../../services/messages/messages.service';
import { httpResponse } from '../../Utils/types/responseHttp';
import { Router } from '@angular/router';
const {SEND_MESSAGE}=tools.services.methods
const {Authorization,routes,errors,messages,Email}=tools.components


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()show_message=false;
  @Input()component="";
  form!:FormGroup;
  auth:string
  errors:any={
    email:"",
    ratting:"",
    message:""
  }
  email=""
  authenticationMessage="Se require autenticarse"
  messages:any=messages.messagesError

  constructor(private builder:FormBuilder,private message:MessagesService,private nav:Router) {
     this.auth=localStorage.getItem(Authorization)||""
     this.email=localStorage.getItem(Email)||""
     this.auth=localStorage.getItem(Authorization)||""
  }

  ngOnInit(): void {
     this.form=this.builder.group(
      {
          email:[this.email,[Validators.required,Validators.email]],
          ratting:[1,[Validators.required,Validators.min(1)]],
          message:["",[Validators.required,Validators.minLength(50)]],
          component:this.component
      }
    )
    this.form.valueChanges.subscribe(()=>this.formChangesHanddler())
  }

   formChangesHanddler(){
     for (const error in this.errors) {
      if (!this.errors.hasOwnProperty(error))return
      let field=this.form.get(error)
       if(field && field.dirty&&!field.valid)
       for (const fError in field.errors) {
          this.errors[error]=""
          this.errors[error]=this.messages[error][fError];
       }
     }
   }

   toggle(){
    this.show_message=!this.show_message;
   }

   refreshToken(token:string){
    this.auth=token;
    localStorage.setItem(Authorization,token)
  }

   sendMessage(){
    if(!this.auth)return
     if(this.form.valid){
        let net:any=this.message;
        net[SEND_MESSAGE](this.auth,this.form.value).subscribe((res:httpResponse)=>{
          this.form.reset()
          if(res.token)return this.refreshToken(res.token)
        }, (err:any)=>{
    if(err.error.message.name==errors.token||err.error.message==errors.not_exist)return this.nav.navigate([routes.login])
    if(err.token)return this.refreshToken(err.token)
  })
}}

}
