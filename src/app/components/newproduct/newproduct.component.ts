import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnexpiredService } from '../../services/product/unexpired/unexpired.service';
import { Router } from '@angular/router';
import tools from 'src/app/Utils/tools';
import { httpResponse } from '../../Utils/types/responseHttp';
import { QueriesService } from '../../services/queries/queries.service';
const {message_error,errors,form,fieldsForm}=tools.components.newproduct, {Authorization,routes}=tools.components, {NEW_PRODUCT,REMAINING,DURATION,CONSUMPTIOND,WAST,RECOMENDATION}=tools.components.services;

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
  interactive_fields=fieldsForm
  liveInteraction=fieldsForm.liveInteraction


  constructor(private fbuilder:FormBuilder,private net:UnexpiredService,private nave:Router,private q:QueriesService) {
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
      if(res.data)this.liveInteraction.remaining=res.data
      this.wast_cosumptionD_recomend()
    })

  }

    durationsD(){
      const expiryDate =this.form.get(this.interactive_fields.expiryDate)?.value,
      net:any= this.q;
      net[DURATION](this.auth,expiryDate).subscribe((res:httpResponse)=>{
        if(res.data)this.liveInteraction.durationsD=res.data
        this.wast_cosumptionD_recomend()

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
        if(res.data)this.liveInteraction.consumptionsD=res.data
      })

      if(quantity==this.liveInteraction.recomendation){
        this.liveInteraction.recomendation=0
        this.liveInteraction.wast=0
        return
      }

      net[WAST](this.auth,product,quantity,expiryDate).subscribe((res:httpResponse)=>{
        if(res.data)this.liveInteraction.wast=res.data
      })
      net[RECOMENDATION](this.auth,product,quantity,expiryDate).subscribe((res:httpResponse)=>{
        if(res.data)this.liveInteraction.recomendation=res.data
      })
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
