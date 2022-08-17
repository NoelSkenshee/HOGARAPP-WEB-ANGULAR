import { Component, OnInit } from '@angular/core';
import { Product } from '../../Utils/types/product';
import { Route, Router } from '@angular/router';
import { UnexpiredService } from '../../services/product/unexpired/unexpired.service';
import tools from 'src/app/Utils/tools';
import { httpResponse } from '../../Utils/types/responseHttp';
import { ConsumptionService } from '../../services/consumption/consumption.service';
import { MenuEventService } from '../../services/events/menu_event/menu-event.service';
import { TitleService } from '../../services/events/title/title.service';
const {IMAGE,Authorization,unexpired,routes,classes,errors,ToPlural,nodata}=tools.components, {LIST_UNXPIRED}=tools.components.services, {img_products}=unexpired, {INSERT_CONSUMPTION}=tools.components.services;

@Component({
  selector: 'app-unexpired',
  templateUrl: './unexpired.component.html',
  styleUrls: ['./unexpired.component.css'],
})
export class UnexpiredComponent implements OnInit {
  img_path=IMAGE+img_products
  context=nodata.contextList.Product
   auth!:string;
   products!:Product[]
   active1=classes.active
   active2=""
   active3=""
    menu=false;
   loading=false;
   totalProduct=0;
   ToPlural=ToPlural;
   message=false
   constructor(private net:UnexpiredService,private nave:Router,private consum: ConsumptionService,private menuService:MenuEventService,private title:TitleService) {
    this.auth=<any>localStorage.getItem(Authorization);
    if(!this.auth)this.nave.navigate([routes.home])
    this.menuService.emitte$.subscribe(()=>{
      this.menu=!this.menu
    })
    this.title.title(this.context)
  }

  refreshToken(token:string){
    this.auth=token;
    localStorage.setItem(Authorization,token)
  }

  ngOnInit(): void {

  }

  list(){
    const net:any=this.net;
    this.loading=true;
    net[LIST_UNXPIRED](this.auth).subscribe((res:httpResponse)=>{
       this.products=res.data
       if(res.token)this.refreshToken(res.token)
       this.totalProduct=this.products.length
        this.loading=false;
      },(err:any)=>{
        if(err.error.message.name==errors.token||err.error.message==errors.not_exist)return this.nave.navigate([routes.login])
        if(err.token)return this.refreshToken(err.token)
      })
    }

  consumption(product:Product){
    this.loading=!this.loading;
   const consum:any= this.consum;
    consum[INSERT_CONSUMPTION]({...product,productId:product.id ,quantity:product.quantity},this.auth).subscribe((res:any)=>{
      this.list()
      if(res.token)this.refreshToken(res.token)
      this.loading=!this.loading;
    },(err:any)=>{
      if(err.error.message.name==tools.components.errors.token||err.error.message==tools.components.errors.not_exist)return this.nave.navigate([routes.login])
     if(err.token)return this.refreshToken(err.token)
    })
  }


  toggle(btn:any){
    if (btn==1){
      this.active2=""
      this.active3=""
      this.active1=classes.active
    }else if(btn==2){
      this.active1=""
      this.active3=""
      this.active2=classes.active
      this.list()
    }else{
      this.active1=""
      this.active3=classes.active
      this.active2=""
      this.list()
    }

  }
  togMenu(){
    this.menu=!this.menu
  }

}
