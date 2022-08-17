import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class NodataComponent implements OnInit {
  @Input() context!:string;
  @Input() message!:string;
  @Input() backRoute!:boolean;
  @Output("newInstance") event:EventEmitter<any>=new EventEmitter();
  constructor() { }
  ngOnInit(): void {
  }
  emitInstance(){
    this.event.emit()
  }
}
