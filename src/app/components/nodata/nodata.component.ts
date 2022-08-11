import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nodata',
  templateUrl: './nodata.component.html',
  styleUrls: ['./nodata.component.css']
})
export class NodataComponent implements OnInit {
  @Input() context!:string;
  @Input() message!:string;
  @Output("newInstance") event:EventEmitter<any>=new EventEmitter();
  constructor() { }
  ngOnInit(): void {
  }
  emitInstance(){
    this.event.emit()
  }
}
