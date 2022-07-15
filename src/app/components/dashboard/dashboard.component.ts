import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../Utils/types/product';
import { UnexpiredService } from '../../services/product/unexpired/unexpired.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }

}
