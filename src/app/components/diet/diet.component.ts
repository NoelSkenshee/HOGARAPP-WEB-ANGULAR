import { Component, OnInit } from '@angular/core';
import { TresponseDiet, Tdiet } from '../../Utils/types/Tdiet';
import {Router } from '@angular/router';
import { DietService } from '../../services/diet/diet.service';
import tools from 'src/app/Utils/tools';
import { MenuEventService } from '../../services/events/menu_event/menu-event.service';
import { QueriesService } from 'src/app/services/queries/queries.service';
import { httpResponse } from '../../Utils/types/responseHttp';
import { TitleService } from '../../services/events/title/title.service';
const {Authorization,routes,IMAGE,img_products,errors,week,classes,ToPlural,nodata}=tools.components
const {LIST_DIET,PROGRESS_DAY_DIET,DURATION}=tools.components.services

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent implements OnInit {
   active1=classes.active
   active2=""
   auth!:string
   dietList!:Tdiet[]
   img_path=IMAGE+img_products
   week=week
   menu=false
   loading=false;
   totalDiet=0;
   context=nodata.contextList.dieta;
   ToPlural=ToPlural
  constructor(private nav:Router,private net:DietService,private menuService:MenuEventService,private q:QueriesService,private title:TitleService) {
    this.auth=<any>localStorage.getItem(Authorization);
    if(!this.auth)this.nav.navigate([routes.home])
    this.menuService.emitte$.subscribe(()=>{
      this.menu=!this.menu
    });
    this.title.title(this.context)
  }

  ngOnInit(): void {
    this.listDiet()
  }


  refreshToken(token:string){
    this.auth=token;
    localStorage.setItem(Authorization,token)
  }

listDiet(){
  this.loading=!this.loading;
 let net:any=this.net;
 net[LIST_DIET](this.auth).subscribe((res:TresponseDiet)=>{
    if(!res.error) this.dietList=<Tdiet[]>res.data
    if(res.token)this.refreshToken(res.token)
    this.loading=!this.loading;
    this.totalDiet=this.dietList.length
  },(err:any)=>{
     if(err.error.message?.name==errors.token||err.error.message==errors.not_exist)return this.nav.navigate([routes.login])
     if(err.token)return this.refreshToken(err.token)
  })
}

  icrementday(diet:Tdiet){
    let net:any=this.net;
    net[PROGRESS_DAY_DIET](this.auth,diet).subscribe((res:TresponseDiet)=>{
       if(!res.error) this.listDiet()
       if(res.token)this.refreshToken(res.token)
  },(err:any)=>{
    if(err.error.message.name==errors.token||err.error.message==errors.not_exist)return this.nav.navigate([routes.login])
   if(err.token)return this.refreshToken(err.token)
  })
}



  toggle(btn:any){
    if (btn==1){
      this.active2=""
      this.active1=classes.active
    }else {
      this.active1=""
      this.active2=classes.active
      this.listDiet()
    }

  }

  oldDate(initDate:Date){
    return new Date(initDate)<=new Date()
  }

  verifyDay(diet:Tdiet,date?:Date){
    return  diet.daysTime.filter((d)=>d.day==(new Date(date?date:new Date)).getDay()).length
   }

     getLastDay(date:Date){
    const hours=60,day=24,time=(new Date().getTime()-new Date(date).getTime());
    return Math.round(time/(1000*hours*hours*day))
   }

   itsToday(date:Date){
     let now=new Date();
     date=new Date(date)
     return new Date(`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`).toString()==new Date(`${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}`).toString()
   }
  today(day:number,initDate:Date){
    if(new Date().getDay()==day && this.oldDate(initDate))return {class:classes.today,value:true}
    else return {class:classes.notToday,value:false}
  }


  togMenu(){
    this.menu=!this.menu
      }
}
