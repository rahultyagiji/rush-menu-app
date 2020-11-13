import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {Order} from '../datatypes/order';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order:Order[]=[]
  total$: number = 0;
  discountTotal$: number = 0;
  fees$: number = 30;
  totalCharge$: number = 0;
  tipAmount: number = 0;
  additiveTax: string = "0";
  inclusiveTax: string = "0";
  grandTotal: number = 0;
  private orderSubscription: Subscription;


  constructor(
    public orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderSubscription = this.orderService.getOrder().subscribe((x) => {
      this.order = x;
      this.totalPrice(this.order);
    });
  }

  totalPrice(order: Order[]) {
    this.taxCalc();
    this.total$ = 0;
    order.forEach((x) => {
      //for total
      this.total$ = Math.round((this.total$ + parseFloat(x.priceQuantity)) * 100) / 100;
    })
    //remember to add cafe discount back
    this.discountTotal$ = Math.round(this.total$ * (1 - 0 / 100) * 100) / 100;
    // this.discountTotal$ = Math.round(this.total$ * (1 - this.cafe.discount / 100) * 100) / 100;
    if (this.additiveTax != "0") {
      this.grandTotal = (this.discountTotal$ + parseFloat(this.additiveTax))
    }
    else {
      this.grandTotal = this.discountTotal$
    }
  }


  taxCalc() {
    this.inclusiveTax = "0";
    this.additiveTax = "0";
    this.order.forEach((x) => {
      if (typeof x.tax != 'undefined') {
        if (x.tax.type == 'additive') {

          // remember to add cafe discount back here
          this.additiveTax = ((parseFloat(x.priceQuantity) * (1 - 0 / 100)) * x.tax.percent / 100 + parseFloat(this.additiveTax)).toFixed(2).toString()

          // this.additiveTax = ((parseFloat(x.priceQuantity) * (1 - this.cafe.discount / 100)) * x.tax.percent / 100 + parseFloat(this.additiveTax)).toFixed(2).toString()
        }
        if (x.tax.type == 'inclusive') {
          this.inclusiveTax = ((parseFloat(x.priceQuantity) * (1 - 0 / 100)) * x.tax.percent / 100 + parseFloat(this.inclusiveTax)).toFixed(2).toString()
          // this.inclusiveTax = ((parseFloat(x.priceQuantity) * (1 - this.cafe.discount / 100)) * x.tax.percent / 100 + parseFloat(this.inclusiveTax)).toFixed(2).toString()
        }
      }
    })
  }


}
