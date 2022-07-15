import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnexpiredService } from '../../services/product/unexpired/unexpired.service';
import { Router } from '@angular/router';
import tools from 'src/app/Utils/tools';
import { httpResponse } from '../../Utils/types/responseHttp';
const {message_error,errors,form,fieldsForm}=tools.components.newproduct, {Authorization,routes}=tools.components, {NEW_PRODUCT}=tools.components.services;

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {
  form!:FormGroup
  file!:File
  auth!:string
  post_product!:string;
  message_error:any=message_error
  errors:any=errors

  constructor(private fbuilder:FormBuilder,private net:UnexpiredService,private nave:Router) {
      this.auth=<any>localStorage.getItem(Authorization);
      if(!this.auth)this.nave.navigate([routes.home])
      this.post_product=tools.services.product.productSQL(this.auth)

  }

  ngOnInit(): void {
     this.form=this.fbuilder.group({
      product: ["",Validators.required],
      category: ["",Validators.required],
      expiryDate: ["",Validators.required],
      total: [0,[Validators.required,Validators.min(1)]],
      quantity: [0,[Validators.required,Validators.min(0.1)]],
      unit:["",Validators.required],
      image: []
     });

    this.form.valueChanges.subscribe(()=>this.validate())

  }

  validate(){
    if(!this.form)return
     for (const key in this.message_error) {
      if (!this.message_error.hasOwnProperty(key))return
      const field =this.form.get(key);
      if(field && field.dirty && field.invalid){
      for (const error in field.errors) {
        if (!field.errors.hasOwnProperty(error)) return
         this.message_error[key]=this.errors[key][error]
      }
       }
     }
  }


   filemanager(file:any){
    const file_=<File>file.target.files[0];
    this.form.value.image=file_
 }

  saveProduct(){
   if(this.form.invalid)return
    const values=<any>this.form.value,net:any=this.net;
     net[NEW_PRODUCT](this.auth,form(fieldsForm.list,values)).subscribe((res:httpResponse)=>{
      if(!res.error){
        this.form.reset()
      }
    },(err:any)=>{console.log(err);
    })

  }



}
