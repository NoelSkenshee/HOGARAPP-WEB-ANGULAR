import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/events/title/title.service';
import tools from 'src/app/Utils/tools';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordService } from '../../services/password/password.service';
import { httpResponse } from '../../Utils/types/responseHttp';
import { Router } from '@angular/router';
import { TconfigProduct } from '../../Utils/types/TconfigProduct';
import { ProductService } from '../../services/config/product/product.service';
import { TconfigDiet } from '../../Utils/types/TconfigDiet';
import { DietConfigService } from '../../services/config/diet/diet-config.service';
const {nodata,Email,Authorization,routes,config}=tools.components;
const {CHANGE_PASSWORD,PASSWORD_STATUS,CONFIG_PRODUCT,GET_CONFIG_PRODUCT,CONFIG_DIET,GET_CONFIG_DIET}=tools.components.services;


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
   context=nodata.contextList.config;
   form!:FormGroup
   email=""
   auth=""
   config_product:TconfigProduct={
    notify_before_expired: false,
    expired_before_n_month:0,
    notify_on_finishing: false
   }
   notifIconHtml=`<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12C15.13 12 12 15.13 12 19C12 19.34 12.03 19.67 12.08 20H3V19L5 17V11C5 7.9 7.03 5.17 10 4.29V4C10 2.9 10.9 2 12 2S14 2.9 14 4V4.29C16.97 5.17 19 7.9 19 11V12M10 21C10 22.11 10.9 23 12 23C12.39 23 12.75 22.88 13.06 22.69C12.74 22.17 12.5 21.6 12.3 21H10M23.77 20.32C23.87 20.39 23.89 20.53 23.83 20.64L22.83 22.37C22.77 22.5 22.64 22.5 22.53 22.5L21.28 21.97C21 22.17 20.75 22.34 20.44 22.47L20.25 23.79C20.23 23.91 20.13 24 20 24H18C17.88 24 17.77 23.91 17.75 23.79L17.57 22.47C17.25 22.34 17 22.17 16.72 21.97L15.5 22.5C15.37 22.5 15.23 22.5 15.17 22.37L14.17 20.64C14.11 20.53 14.14 20.39 14.23 20.32L15.29 19.5C15.27 19.33 15.25 19.17 15.25 19S15.27 18.67 15.29 18.5L14.23 17.68C14.14 17.61 14.11 17.5 14.17 17.36L15.17 15.64C15.23 15.53 15.37 15.5 15.5 15.53L16.72 16C17 15.83 17.25 15.66 17.57 15.54L17.75 14.21C17.77 14.09 17.88 14 18 14H20C20.13 14 20.23 14.09 20.25 14.21L20.44 15.54C20.75 15.66 21 15.83 21.28 16L22.53 15.53C22.64 15.5 22.77 15.53 22.83 15.64L23.83 17.36C23.89 17.5 23.87 17.61 23.77 17.68L22.72 18.5C22.74 18.67 22.75 18.84 22.75 19S22.74 19.33 22.72 19.5L23.77 20.32M20.75 19C20.75 18.03 19.97 17.25 19 17.25S17.25 18.03 17.25 19 18.04 20.75 19 20.75 20.75 19.97 20.75 19Z" /></svg>`
   config_diet:TconfigDiet={
    google_calendar: 0,
    notify_by_mail: 0
   }

  errors:any={
    password:"",
    new_password:"",
    new_password2:""
  };
  message_error:any=config.error_messages


  password_status=0;

  constructor(private title:TitleService, private builder:FormBuilder,private password:PasswordService,private nav:Router,private configP:ProductService,private configD:DietConfigService) {
    this.title.title$.emit(nodata.contextList.config)
    this.email=localStorage.getItem(Email)||""
    this.auth=localStorage.getItem(Authorization)||""
    if(!this.auth||!this.email) this.nav.navigate([routes.login])
    this.status()
    this.getProductConfig()
    this.getProductDiet()
  }

  ngOnInit(): void {

    this.form=this.builder.group({
      password:["",Validators.required],
      new_password:["",Validators.required],
      new_password2:["",Validators.required]
   });
   this.form.valueChanges.subscribe(()=>this.changeHandler())
  }

  changeHandler(){
     for (const field in this.errors) {
      if (!this.errors.hasOwnProperty(field))return
      const form_field=this.form.get(field), form_field2=this.form.get("new_password2");
      this.errors[field]=""
      if(form_field &&!form_field.valid){
        for (const error in form_field.errors) {
            this.errors[field]=this.message_error[field][error]

        }
      }
     }
  }

  change(){
    let password:any=this.password;
    if(!this.form.valid) return
    password[CHANGE_PASSWORD]({...this.form.value,email:this.email}).subscribe((res:httpResponse)=>{
       this.status()
       this.form.reset()
    })
  }


  status(){
    let password:any=this.password;
    password[PASSWORD_STATUS](this.auth).subscribe((res:httpResponse)=>{
      this.password_status=res.data
    })
  }

  configProduct(){
    let configP:any=this.configP;
    configP[CONFIG_PRODUCT](this.auth,this.config_product).subscribe((res:httpResponse)=>{
      this.getProductConfig()
    })
  }

  getProductConfig(){
    let configP:any=this.configP;
    configP[GET_CONFIG_PRODUCT](this.auth).subscribe((res:httpResponse)=>{
      this.config_product=res.data
    })
  }


  configDiet(){
    let configD:any=this.configD;
    configD[CONFIG_DIET](this.auth,this.config_diet).subscribe((res:httpResponse)=>{
      this.getProductDiet()
    })
  }


  getProductDiet(){
    let configD:any=this.configD;
    configD[GET_CONFIG_DIET](this.auth).subscribe((res:httpResponse)=>{
      this.config_diet=res.data
    })
  }

}