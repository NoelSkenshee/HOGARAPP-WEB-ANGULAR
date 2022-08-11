import { Route, Router, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LogupComponent } from '../components/logup/logup.component';
import { LoginComponent } from '../components/login/login.component';
import { VerifyComponent } from '../components/verify/verify.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { UnexpiredComponent } from '../components/unexpired/unexpired.component';
import { NewproductComponent } from '../components/newproduct/newproduct.component';
import { ConsumptionComponent } from '../components/consumption/consumption.component';
import { ExpiredComponent } from '../components/expired/expired.component';
import { DonationsComponent } from '../components/donations/donations.component';
import { DietComponent } from '../components/diet/diet.component';

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
      path:"diet",
      component:DietComponent

    },
    {
      path:"consumption",
      component:ConsumptionComponent

    },

    {
      path:"expired",
      component:ExpiredComponent

    },
    {
      path:"donations",
      component:DonationsComponent

    }
]
}

]
