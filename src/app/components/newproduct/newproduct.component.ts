import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnexpiredService } from '../../services/product/unexpired/unexpired.service';
import { Router } from '@angular/router';
import tools from 'src/app/Utils/tools';
import { httpResponse } from '../../Utils/types/responseHttp';
import { QueriesService } from '../../services/queries/queries.service';
const {message_error,errors,form,fieldsForm}=tools.components.newproduct, {Authorization,routes,IMAGE,img_products}=tools.components, {NEW_PRODUCT,REMAINING,DURATION,CONSUMPTIOND,WAST,RECOMENDATION,AVERAGE}=tools.components.services;

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
  img_path=IMAGE+img_products
  unit=""
  interactive_fields=fieldsForm
  liveInteraction=fieldsForm.liveInteraction


  constructor(private fbuilder:FormBuilder,private net:UnexpiredService,private nave:Router,private q:QueriesService) {
      this.auth=<any>localStorage.getItem(Authorization);
      if(!this.auth)this.nave.navigate([routes.home])
      this.post_product=tools.services.product.productSQL(this.auth)

  }

  refreshToken(token:string){
    this.auth=token;
    localStorage.setItem(Authorization,token)
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

    this.form.valueChanges.subscribe(()=>{this.validate()})

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


  remaining(){
    const product =this.form.get(this.interactive_fields.product)?.value,
     net:any= this.q;
    net[REMAINING](this.auth,product).subscribe((res:httpResponse)=>{
      if(res.data){
        this.liveInteraction.remaining=res.data.remaining?.toFixed(2)
        this.unit=res.data.unit
      }
      this.wast_cosumptionD_recomend()
      this.average()
    },(err:any)=>{
      if(err.error.message.name==tools.components.errors.token||err.error.message==tools.components.errors.not_exist)return this.nave.navigate([routes.login])
     if(err.token)return this.refreshToken(err.token)
    })

  }


  average(){
    const product =this.form.get(this.interactive_fields.product)?.value,
     net:any= this.q;
    net[AVERAGE](this.auth,product).subscribe((res:httpResponse)=>{
      console.log(res);
      if(res.data){
        this.liveInteraction.average=res.data.average?.toFixed(2)
      }
    },(err:any)=>{
      if(err.error.message.name==tools.components.errors.token||err.error.message==tools.components.errors.not_exist)return this.nave.navigate([routes.login])
     if(err.token)return this.refreshToken(err.token)
    })

  }

    durationsD(){
      const expiryDate =this.form.get(this.interactive_fields.expiryDate)?.value,
      net:any= this.q;
      net[DURATION](this.auth,expiryDate).subscribe((res:httpResponse)=>{
        if(res.data)this.liveInteraction.durationsD=res.data?.toFixed(2)
        this.wast_cosumptionD_recomend()
      },(err:any)=>{
        if(err.error.message.name==tools.components.errors.token||err.error.message==tools.components.errors.not_exist)return this.nave.navigate([routes.login])
       if(err.token)return this.refreshToken(err.token)
      })
    }





    wast_cosumptionD_recomend(){
      const product =this.form.get(this.interactive_fields.product)?.value;
      const quantity =this.form.get(this.interactive_fields.quantity)?.value;
      const expiryDate =this.form.get(this.interactive_fields.expiryDate)?.value,
      net:any= this.q;

      if(!product||quantity<=0||!expiryDate){
        this.liveInteraction.recomendation=0
        this.liveInteraction.consumptionsD=0
        this.liveInteraction.wast=0
        return
      }
      net[CONSUMPTIOND](this.auth,product,quantity,expiryDate).subscribe((res:httpResponse)=>{
        if(res.data)this.liveInteraction.consumptionsD=res.data.consumptionDays?.toFixed(2)
        if(res.token)this.refreshToken(res.token)
      },(err:any)=>{
        if(err.error.message.name==tools.components.errors.token||err.error.message==tools.components.errors.not_exist)return this.nave.navigate([routes.login])
       if(err.token)return this.refreshToken(err.token)
      })

      if(quantity==this.liveInteraction.recomendation){
        this.liveInteraction.recomendation=0
        this.liveInteraction.wast=0
        return
      }

      net[WAST](this.auth,product,quantity,expiryDate).subscribe((res:httpResponse)=>{
        if(res.data)this.liveInteraction.wast=res.data.wast?.toFixed(2)
        if(res.token)this.refreshToken(res.token)
      },(err:any)=>{
        if(err.error.message.name==tools.components.errors.token||err.error.message==tools.components.errors.not_exist)return this.nave.navigate([routes.login])
       if(err.token)return this.refreshToken(err.token)
      })

      net[RECOMENDATION](this.auth,product,quantity,expiryDate).subscribe((res:httpResponse)=>{
        if(res.data)this.liveInteraction.recomendation=res.data.recomendation?.toFixed(2)
        if(res.token)this.refreshToken(res.token)
      },(err:any)=>{
        if(err.error.message.name==tools.components.errors.token||err.error.message==tools.components.errors.not_exist)return this.nave.navigate([routes.login])
       if(err.token)return this.refreshToken(err.token)
      })
    }





   filemanager(file:any){
    const file_=<File>file.target.files[0];
    this.form.value.image=file_
 }

  saveProduct(){
   if(this.form.invalid)return
    const values=<any>this.form.value,net:any=this.net;
     values.price=values.total/values.quantity;
     net[NEW_PRODUCT](this.auth,form(fieldsForm.list,values)).subscribe((res:httpResponse)=>{
      if(!res.error){
        alert(JSON.stringify(res))
        this.form.reset()
      }
      if(res.token)this.refreshToken(res.token)
    },(err:any)=>{
      if(err.error.message.name==tools.components.errors.token||err.error.message==tools.components.errors.not_exist)return this.nave.navigate([routes.login])
     if(err.token)return this.refreshToken(err.token)
    })
  }
}
