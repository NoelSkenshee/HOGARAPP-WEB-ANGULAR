import { Component, OnInit } from '@angular/core';
import { Product } from '../../Utils/types/product';
import { Route, Router } from '@angular/router';
import { UnexpiredService } from '../../services/product/unexpired/unexpired.service';
import tools from 'src/app/Utils/tools';
import { httpResponse } from '../../Utils/types/responseHttp';
import { ConsumptionService } from '../../services/consumption/consumption.service';
const {IMAGE,Authorization,unexpired,routes}=tools.components, {LIST_UNXPIRED}=tools.components.services, {img_products}=unexpired, {INSERT_CONSUMPTION}=tools.components.services;

@Component({
  selector: 'app-unexpired',
  templateUrl: './unexpired.component.html',
  styleUrls: ['./unexpired.component.css'],
})
export class UnexpiredComponent implements OnInit {
  img_path=IMAGE+img_products
   auth!:string;
   products!:Product[]
   constructor(private net:UnexpiredService,private nav:Router,private consum: ConsumptionService) {
    this.auth=<any>localStorage.getItem(Authorization);
    if(!this.auth)this.nav.navigate([routes.home])
  }

  ngOnInit(): void {
this.list()
  }

  list(){
    const net:any=this.net;
    net[LIST_UNXPIRED](this.auth).subscribe((res:httpResponse)=>{
       this.products=res.data
    },(err:any)=>{

    })
  }


  consumption(product:Product){
   const consum:any= this.consum;
    consum[INSERT_CONSUMPTION](product,this.auth).subscribe((res:any)=>{
      console.log(res);
      this.list()
    })

  }

}
