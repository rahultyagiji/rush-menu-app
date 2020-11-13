import { Injectable } from '@angular/core';
import {Item} from './datatypes/item';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  cafeInfo:Item
  constructor() { }

  setCafeInfo(info){
  this.cafeInfo=info
  }

  getCafeInfo(){
  return this.cafeInfo;
  }
}
