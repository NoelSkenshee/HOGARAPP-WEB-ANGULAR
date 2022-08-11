import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  public title$:EventEmitter<string>=new EventEmitter;

  constructor() { }
  title(title:string){
    this.title$.emit(title)
  }
}
