import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  @Output("toggle") EventToggle:EventEmitter<any>=new EventEmitter()


  constructor() { }

  ngOnInit(): void {
  }

   toggle(){
    this.EventToggle.emit()
   }


}
