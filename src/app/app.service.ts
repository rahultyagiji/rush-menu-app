import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
cafeId:string=""
  constructor() { }

  setCafeIf(id){
  this.cafeId=id
  }

  getCafeId(){
  return this.cafeId;
  }
}
