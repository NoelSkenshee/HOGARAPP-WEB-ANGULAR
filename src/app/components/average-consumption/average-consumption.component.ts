import { Component, Input, OnInit } from '@angular/core';
import tools from 'src/app/Utils/tools';
import { Consumption } from '../../Utils/types/consumption';

const {IMAGE,unexpired,ToPlural}=tools.components, {img_products}=unexpired;

@Component({
  selector: 'app-average-consumption',
  templateUrl: './average-consumption.component.html',
  styleUrls: ['./average-consumption.component.css']
})
export class AverageConsumptionComponent implements OnInit {


@Input() averages!:{[key:string]:Consumption};
ToPlural=ToPlural;
img_path=IMAGE+img_products

  constructor() {}

  ngOnInit(): void {
  }


}
