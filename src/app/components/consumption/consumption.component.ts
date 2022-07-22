import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import tools from 'src/app/Utils/tools';
import { ConsumptionService } from '../../services/consumption/consumption.service';
import { ConsumptionRes, Consumption } from '../../Utils/types/consumption';
const {IMAGE,Authorization,unexpired,routes}=tools.components, {LIST_CONSUMPTION}=tools.components.services, {img_products}=unexpired;

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
   active1="active"
   active2=""
   constructor(private net:ConsumptionService,private nav:Router) {
    this.auth=<any>localStorage.getItem(Authorization);

  }

  ngOnInit(): void {
    if(!this.auth)this.nav.navigate([routes.home])
    const net_:any=this.net;
    net_[LIST_CONSUMPTION](this.auth).toPromise().then((res:any)=>{
      this.consumptions=res.data;
      this.averages=res.averages
     },(err:any)=>console.error(err) )
  }



  toggle(btn:any){
    if (btn==1){
      this.active2=""
      this.active1="active"
    }else {
      this.active1=""
      this.active2="active"
    }

  }


}
