import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../Utils/types/product';
import { MenuEventService } from '../../services/events/menu_event/menu-event.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input()product_list!:Product[]
  product_map:{[key:string]:{info:Product,totalSum:number,stored:number,repeat:number,price:number}}={}

  ngOnInit(): void {
    this.product_list.forEach(p => {
      if(this.product_map && this.product_map[p.product]){
        this.product_map[p.product]["totalSum"]+=(p.quantity-p.consumption)*p.price
        this.product_map[p.product]["stored"]+=p.quantity-p.consumption
        this.product_map[p.product]["repeat"]+=1
        this.product_map[p.product]["price"]+=p.price
      }else this.product_map[p.product]={info:p,totalSum:(p.quantity-p.consumption)*p.price,stored:p.quantity-p.consumption,repeat:1,price:p.price}
     })

  }
  async mapProduct(){
    if(!this.product_list)return

  }

}
