import { Component, OnInit } from '@angular/core';
import { Tdiet, TresponseDiet } from '../../Utils/types/Tdiet';
import tools from 'src/app/Utils/tools';
import { Router } from '@angular/router';
import { DietService } from '../../services/diet/diet.service';
const {Authorization,routes,errors,week,diet}=tools.components
const {INSERT_DIET}=tools.components.services

@Component({
  selector: 'app-diet-form',
  templateUrl: './diet-form.component.html',
  styleUrls: ['./diet-form.component.css']
})
export class DietFormComponent implements OnInit {
  auth!:string
  diet={
    product: "",
    quantity:0,
    daysTime:[{day:0,textDay:"",time:""}],
    initDate: new Date,
    endDate: new Date,
  }

  week=week

  constructor(private nav:Router,private net:DietService) {
    this.auth=<any>localStorage.getItem(Authorization);
    if(!this.auth)this.nav.navigate([routes.home])
  }

  ngOnInit(): void {
  }

  newDay(){
    if(this.diet.daysTime.length<7)this.diet.daysTime.push({day:0,textDay:"",time:""})
  }
  refreshToken(token:string){
    this.auth=token;
    localStorage.setItem(Authorization,token)
  }
  saveDiet(){
     let net:any=this.net;
     net[INSERT_DIET](this.auth,this.diet).subscribe((res:TresponseDiet)=>{
        if(res.token)this.refreshToken(res.token)
        this.diet=diet.cleanForm()
      },(err:any)=>{
        if(err.error.message.name==errors.token||err.error.message==errors.not_exist)return this.nav.navigate([routes.login])
       if(err.token)return this.refreshToken(err.token)
      })
    }

    dayCode(day:any){
      let selected:any=-1;
      this.week.map((v,i)=>{
      if(v.code==day||v.ui==day){
        selected=i;
      }
     })
     return selected
    }

}
