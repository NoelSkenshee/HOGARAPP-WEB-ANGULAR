import { Component, OnInit } from '@angular/core';
import { Product } from '../../Utils/types/product';
import { Router } from '@angular/router';
import { httpResponse } from '../../Utils/types/responseHttp';
import { ExpiredService } from '../../services/product/expired/expired.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DonateDialogComponent } from '../donate-dialog/donate-dialog.component';
import tools from 'src/app/Utils/tools';
import { MenuEventService } from '../../services/events/menu_event/menu-event.service';
import { TitleService } from '../../services/events/title/title.service';
const {IMAGE,Authorization,unexpired,routes,errors,classes,nodata,ToPlural}=tools.components, {TO_TRASH,INSERT_DONATE,LIST_EXPIRED}=tools.components.services, {img_products}=unexpired, {INSERT_CONSUMPTION}=tools.components.services;

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
  active1=classes.active
  active2=""
  menu=false
  loading=false;
  message=nodata.message(nodata.contextList.Product)
  totalProduct=0
  ToPlural=ToPlural
  context=nodata.contextList.expired
  constructor(private net:ExpiredService,private nav:Router,private dialog:MatDialog,private menuService:MenuEventService,private title:TitleService) {
   this.auth=<any>localStorage.getItem(Authorization);
   if(!this.auth)this.nav.navigate([routes.home])
   this.menuService.emitte$.subscribe(()=>{
    this.menu=!this.menu
  });
  this.title.title(nodata.contextList.expired)
 }


 refreshToken(token:string){
  this.auth=token;
  localStorage.setItem(Authorization,token)
}
 ngOnInit(): void {
  this.list()
 }

 list(){
  this.loading=!this.loading;
  let net:any=this.net;
   net[LIST_EXPIRED](this.auth).subscribe((res:httpResponse)=>{
      this.products=res.data;
      this.loading=!this.loading;
      this.totalProduct=this.products.length
   },(err:any)=>{
    if(err.error.message.name==errors.token||err.error.message==errors.not_exist)return this.nav.navigate([routes.login])
   if(err.token)return this.refreshToken(err.token)
  })
}


 throw(product:Product){
  let net:any=this.net
  net[TO_TRASH](this.auth,product).subscribe((res:httpResponse)=>{
    this.list()
  },(err:any)=>{
    if(err.error.message.name==errors.token||err.error.message==errors.not_exist)return this.nav.navigate([routes.login])
   if(err.token)return this.refreshToken(err.token)
  })
 }

 donate(destination:string,quantity:number,product:Product,token:string){
  let net:any=this.net
  net[INSERT_DONATE](token,{product,destination,quantity}).subscribe((res:httpResponse)=>{
    this.list()
    this.modal.close();
  },(err:any)=>{
    if(err.error.message.name==errors.token||err.error.message==errors.not_exist)return this.nav.navigate([routes.login])
   if(err.token)return this.refreshToken(err.token)
  })
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

 toggle(btn:any){
  if (btn==1){
    this.active2=""
    this.active1=classes.active
    this.list()
  }else {
    this.active1=""
    this.active2=classes.active
    this.list()
  }

}


 togMenu(){
  this.menu=!this.menu
    }
}
