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
   constructor(private net:ConsumptionService,private nav:Router) {
    this.auth=<any>localStorage.getItem(Authorization);
    if(!this.auth)this.nav.navigate([routes.home])
  }

  ngOnInit(): void {
    const net:any=this.net;
    net[LIST_CONSUMPTION](this.auth).subscribe((res:ConsumptionRes)=>{
      this.consumptions=res.data
     },(err:any)=>console.error(err) )
  }


}
