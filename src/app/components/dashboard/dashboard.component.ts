import { Component, OnInit } from '@angular/core';
import tools from 'src/app/Utils/tools';
import { MenuEventService } from '../../services/events/menu_event/menu-event.service';
import { TitleService } from '../../services/events/title/title.service';
import { Router } from '@angular/router';
const {Authorization,routes,Email}=tools.components

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title=""
   email=""
  constructor(private menu:MenuEventService,private titleEvent:TitleService,private nav:Router) {
      this.titleEvent.title$.subscribe((res)=>this.title=res)
      this.email=localStorage.getItem(Email)||""
  }

  ngOnInit(): void {

  }

toggle(drawer:any){
   drawer.toggle()
}
toggleMenu(){
 this.menu.toggle()
}


closeSession(){
  window.location.reload()
  localStorage.removeItem(Authorization)
   this.nav.navigate([routes.home])
}

}
