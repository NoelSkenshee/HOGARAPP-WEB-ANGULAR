import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuEventService {
  public emitte$:EventEmitter<any>=new EventEmitter();

  constructor() { }

  toggle(){
    this.emitte$.emit()
  }


}
