import { CommonModule } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import {routes} from './routes';

@NgModule({

imports:[RouterModule.forRoot(routes),CommonModule],
exports:[RouterModule]

})
export class RouteResolver  {}

