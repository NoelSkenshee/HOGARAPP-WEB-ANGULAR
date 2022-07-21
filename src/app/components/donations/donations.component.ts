import { Component, OnInit } from '@angular/core';
import { ExpiredService } from '../../services/product/expired/expired.service';
import { Router } from '@angular/router';
import tools from 'src/app/Utils/tools';
import { donation } from 'src/app/Utils/types/donate';
import { httpResponse } from '../../Utils/types/responseHttp';
const {IMAGE,Authorization,unexpired,routes}=tools.components, {LIST_DONATE}=tools.components.services, {img_products}=unexpired;

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {
  auth!:string;
  img_path=IMAGE+img_products
   donations!:donation[]
  constructor(private net:ExpiredService,private nav:Router) {
    this.auth=<any>localStorage.getItem(Authorization);
    if(!this.auth)this.nav.navigate([routes.home])
   }

  ngOnInit(): void {
    this.list()
  }

  list(){
    let net:any=this.net;
    net[LIST_DONATE](this.auth).subscribe((res:httpResponse)=>{
        this.donations=res.data
    },(error:any)=>console.error(error))
  }

}
