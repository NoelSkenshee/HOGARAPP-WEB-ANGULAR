import { Component, OnInit } from '@angular/core';
import { Product } from '../../Utils/types/product';
import { Router } from '@angular/router';
import { httpResponse } from '../../Utils/types/responseHttp';
import { ExpiredService } from '../../services/product/expired/expired.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DonateDialogComponent } from '../donate-dialog/donate-dialog.component';
import tools from 'src/app/Utils/tools';
const {IMAGE,Authorization,unexpired,routes}=tools.components, {TO_TRASH,INSERT_DONATE,LIST_EXPIRED}=tools.components.services, {img_products}=unexpired, {INSERT_CONSUMPTION}=tools.components.services;

@Component({
  selector: 'app-expired',
  templateUrl: './expired.component.html',
  styleUrls: ['./expired.component.css']
})
export class ExpiredComponent implements OnInit {
  img_path=IMAGE+img_products
  auth!:string;
  products!:Product[]
  modal!:MatDialogRef<DonateDialogComponent,any>

  constructor(private net:ExpiredService,private nav:Router,private dialog:MatDialog) {
   this.auth=<any>localStorage.getItem(Authorization);
   if(!this.auth)this.nav.navigate([routes.home])
 }

 ngOnInit(): void {
  this.list()
 }

 list(){
  let net:any=this.net;
   net[LIST_EXPIRED](this.auth).subscribe((res:httpResponse)=>{
      this.products=res.data
   },(err:any)=>{
      console.error(err);
   })
 }

 throw(product:Product){
  let net:any=this.net
  net[TO_TRASH](this.auth,product).subscribe((res:httpResponse)=>{
    this.list()
  },(err:any)=>console.error(err))

 }

 donate(destination:string,quantity:number,product:Product,token:string){
  let net:any=this.net
  net[INSERT_DONATE](token,{product,destination,quantity}).subscribe((res:httpResponse)=>{
    this.list()
    this.modal.close();
  },(err:any)=>console.error(err))
}

 donateDialog(product:Product){
  const modal=this.dialog.open(DonateDialogComponent,{width: "max-content"})
  modal.componentInstance.product=product;
  modal.componentInstance.img_path=this.img_path;
  modal.componentInstance.net=this.net
  modal.componentInstance.auth=this.auth
  modal.componentInstance.donate=this.donate
  modal.componentInstance.modal=modal
  modal.componentInstance.list=this.list

 }



}
