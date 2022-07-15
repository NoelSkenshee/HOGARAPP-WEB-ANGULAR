import { Route, Router, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LogupComponent } from '../components/logup/logup.component';
import { LoginComponent } from '../components/login/login.component';
import { VerifyComponent } from '../components/verify/verify.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { UnexpiredComponent } from '../components/unexpired/unexpired.component';
import { NewproductComponent } from '../components/newproduct/newproduct.component';

export  const routes:Routes= [
{
   path:"",
   component:HomeComponent
},
{
  path:"logup",
  component:LogupComponent
},
{
  path:"verify/:authorization",
  component:VerifyComponent
},
{
  path:"login",
  component:LoginComponent
},
{
  path:"dashboard",
  component:DashboardComponent,
  children:[
    {
        path:"",
        component:UnexpiredComponent

    },
    {
      path:"newproduct",
      component:NewproductComponent

  }
]
}

]
