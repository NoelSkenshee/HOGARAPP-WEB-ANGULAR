import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  @Input() show=false;
  constructor() { }
  ngOnInit(): void {
  }

shareToggle(){
 this.show=!this.show;
}

}
