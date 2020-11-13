import { Injectable } from '@angular/core';
import {Menu} from './datatypes/menu';
import {Order} from './datatypes/order';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  price: string = "0";
  priceQuantity: string = "0";
  order: Order[] = [];

  private _order = new BehaviorSubject<Order[]>([]);



  constructor() {
    console.log("service called")
  }

  getOrder() {

    // return this.order;
    return this._order;

  }

  setOrder(order: Order[]) {
    this.order.length = 0;
    this.order = order;
    this._order.next(order);
  }


  Order(menu: Menu, cafeId, specialInstruction, option: { 'text': string, 'price': string }
    , extras: { 'text': string, 'price': string }[], quantity: number, magic: boolean) {

      this.price = "0";

      // this.price = (parseFloat(menu.price)*quantity).toString();
      this.price = menu.price;
      //    add options price
      if (option) {
        if (option.price) {
          // this.price = (parseFloat(this.price)+parseFloat(option.price)*quantity).toString();}
          this.price = (parseFloat(this.price) + parseFloat(option.price)).toFixed(2).toString();
        }
      }
      //add extras prices
      if (extras) {
        extras.forEach((x) => {
          if (x.price) {

            // this.price = (parseFloat(this.price)+parseFloat(x.price)*quantity).toString();
            this.price = (parseFloat(this.price) + parseFloat(x.price)).toFixed(2).toString();
          }
        });
      }

      this.priceQuantity = (parseFloat(this.price) * quantity).toFixed(2).toString();

        this.order.push({
          'cafeId': cafeId, 'name': menu.name, 'price': this.price,
          'quantity': quantity, 'specialInstruction': specialInstruction, 'option': option, 'extras': extras,
          'priceQuantity': this.priceQuantity,
          'tax': menu.tax
        });
        this._order.next(this.order);

      this.price = "0";
      this.priceQuantity = "0";
    }


}
