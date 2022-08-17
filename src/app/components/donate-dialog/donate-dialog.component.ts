import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../Utils/types/product';
import { ExpiredService } from '../../services/product/expired/expired.service';
import { DialogRef } from '@angular/cdk/dialog';
import tools from 'src/app/Utils/tools';
const {ToPlural}=tools.components;
@Component({
  selector: 'app-donate-dialog',
  templateUrl: './donate-dialog.component.html',
  styleUrls: ['./donate-dialog.component.css']
})
export class DonateDialogComponent implements OnInit {
  product!:Product
  img_path!:string
  destination!:string
  quantity!:number
  net!:ExpiredService
  donate!:any
  list!:any
  auth!:string
  modal!:MatDialogRef<DonateDialogComponent,any>
  ToPlural=ToPlural
  constructor() { }
  ngOnInit(): void {
  }

}
