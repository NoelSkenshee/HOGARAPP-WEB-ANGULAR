import { Component, OnInit } from '@angular/core';
import { ExpiredService } from '../../services/product/expired/expired.service';
import { Router } from '@angular/router';
import tools from 'src/app/Utils/tools';
import { donation } from 'src/app/Utils/types/donate';
import { httpResponse } from '../../Utils/types/responseHttp';
import { TitleService } from '../../services/events/title/title.service';
const {IMAGE,Authorization,unexpired,routes,errors,nodata}=tools.components, {LIST_DONATE}=tools.components.services, {img_products}=unexpired;

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {
  auth!:string;
  img_path=IMAGE+img_products
   donations!:donation[]
   message=nodata.message(nodata.contextList.donate)
   loading=false;
   totalDonate=0
  constructor(private net:ExpiredService,private nav:Router,private title:TitleService) {
    this.auth=<any>localStorage.getItem(Authorization);
    if(!this.auth)this.nav.navigate([routes.home])
    this.title.title(nodata.contextList.donate)
   }


  ngOnInit(): void {
    this.list()
  }
  refreshToken(token:string){
    this.auth=token;
    localStorage.setItem(Authorization,token)
  }

  list(){
    this.loading=!this.loading
    let net:any=this.net;
    net[LIST_DONATE](this.auth).subscribe((res:httpResponse)=>{
        this.donations=res.data
        if(res.token)this.refreshToken(res.token)
        this.loading=!this.loading
        this.totalDonate=this.donations.length;
      },(err:any)=>{
        if(err.error.message.name==errors.token||err.error.message==errors.not_exist)return this.nav.navigate([routes.login])
       if(err.token)return this.refreshToken(err.token)
      })
    }

}
