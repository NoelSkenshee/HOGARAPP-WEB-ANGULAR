import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import tools from 'src/app/Utils/tools';
import { ConsumptionService } from '../../services/consumption/consumption.service';
import {Consumption } from '../../Utils/types/consumption';
import { MenuEventService } from '../../services/events/menu_event/menu-event.service';
import { TitleService } from '../../services/events/title/title.service';
const {IMAGE,Authorization,unexpired,routes,errors,classes,ToPlural,nodata}=tools.components, {LIST_CONSUMPTION}=tools.components.services, {img_products}=unexpired;

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.css']
})
export class ConsumptionComponent implements OnInit {
  img_path=IMAGE+img_products
   auth!:string;
   consumptions!:Consumption[]
   averages!:any;
   active1=classes.active
   active2=""
   loading=false;
   menu=false
   totalConsumption=0;
   ToPlural=ToPlural;
   message=nodata.message(nodata.contextList.consumo)
   context=nodata.contextList.consumo
   constructor(private net:ConsumptionService,private nav:Router,private menuService:MenuEventService,private titleEvent:TitleService) {
    this.auth=<any>localStorage.getItem(Authorization);
    this.menuService.emitte$.subscribe(()=>{
      this.menu=!this.menu
    })
    this.titleEvent.title(nodata.contextList.consumo)
  }
  refreshToken(token:string){
    this.auth=token;
    localStorage.setItem(Authorization,token)
  }

  ngOnInit(): void {
    if(!this.auth)this.nav.navigate([routes.home])
    this.listConsumptions()
  }

  listConsumptions(){
    const net_:any=this.net;
    this.loading=! this.loading;
    net_[LIST_CONSUMPTION](this.auth).toPromise().then((res:any)=>{
      this.consumptions=res.data;
      this.averages=res.averages
      if(res.token)this.refreshToken(res.token)
      this.loading=! this.loading;
      this.totalConsumption=this.consumptions.length;
     },(err:any)=>{
      if(err.error.message.name==errors.token||err.error.message==errors.not_exist)return this.nav.navigate([routes.login])
      if(err.token)return this.refreshToken(err.token)
     })
  }

  toggle(btn:any){
    if (btn==1){
      this.active2=""
      this.active1=classes.active
      this.listConsumptions()
    }else {
      this.active1=""
      this.active2=classes.active
      this.listConsumptions()
    }

  }



  togMenu(){
    this.menu=!this.menu
      }
}
