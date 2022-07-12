import { Route, Router, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LogupComponent } from '../components/logup/logup.component';
import { LoginComponent } from '../components/login/login.component';
import { VerifyComponent } from '../components/verify/verify.component';

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
  path:"login",
  component:LoginComponent
},
{
  path:"verify/:authorization",
  component:VerifyComponent
}

]
