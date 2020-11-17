import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '../order.service';
import {Order} from '../datatypes/order';
import {Subscription} from 'rxjs';
import {AppService} from '../app.service';
import {Item} from '../datatypes/item';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import set = Reflect.set;
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  cafeInfo:Item

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
  zeroQuantityReturn:boolean=false;
  vtableNumber:string=""

  constructor(
    public orderService: OrderService,
    public appService: AppService,
    public router: Router,
    private _location: Location,
    private   toastr: ToastrService

  ) { }

  ngOnInit(): void {

    this.cafeInfo = this.appService.getCafeInfo();

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

    this.discountTotal$ = Math.round(this.total$ * (1 - 0 / 100) * 100) / 100;
    this.discountTotal$ = Math.round(this.total$ * (1 - this.cafeInfo.discount / 100) * 100) / 100;
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


          this.additiveTax = ((parseFloat(x.priceQuantity) * (1 - this.cafeInfo.discount / 100)) * x.tax.percent / 100 + parseFloat(this.additiveTax)).toFixed(2).toString()
        }
        if (x.tax.type == 'inclusive') {
          this.inclusiveTax = ((parseFloat(x.priceQuantity) * (1 - this.cafeInfo.discount / 100)) * x.tax.percent / 100 + parseFloat(this.inclusiveTax)).toFixed(2).toString()
        }
      }
    })
  }

  decreaseQuantity(item, i) {
    // this.cartEmpty.emit(true);
    if (this.order[i].quantity != 0) {
      this.order[i].quantity = this.order[i].quantity - 1;
      this.order[i].priceQuantity = (parseFloat(this.order[i].price) * this.order[i].quantity).toString();
      this.totalPrice(this.order);
      this.deleteQuantityZero();
      this.orderService.setOrder(this.order);
      // this.cartEmpty.emit(true);
    }
    else {
      this.orderService.setOrder(this.order);
      // this.cartEmpty.emit(true);

    }

  }

  deleteQuantityZero() {
    this.order = this.order.filter((x) => {
      return x.quantity != 0;
    });

    if (this.order.length === 0) {
      this._location.back();
      this.zeroQuantityReturn = true;

    }
  };

  confirmOrder(){
    // if (!this.uid && this.order.length != 0) { if (this.guestUser) { this.uid = this.auth.getDeviceIdHash() } }
    var a = this.orderService.confirmOrder(this.order, this.cafeInfo.cafeId, "Cash", "guestId", this.vtableNumber, this.grandTotal, this.cafeInfo.discount, this.cafeInfo.currency, "0", this.tipAmount, this.additiveTax, this.inclusiveTax, "");
    // Log metrics event
    // if (this.guestUser) {
    //   firebase.analytics.logComplexEvent({
    //     key: "guest_pay_later_order",
    //     parameters: [{
    //       key: "order",
    //       type: "array",
    //       value: [
    //         {
    //           parameters: [
    //             { key: "cafeId", value: this.cafeid, type: LogComplexEventTypeParameter.STRING },
    //             { key: "uid", value: this.uid, type: LogComplexEventTypeParameter.STRING },
    //             { key: "arrivalTime", value: this.arrivalTime, type: LogComplexEventTypeParameter.STRING },
    //             { key: "grandTotal", value: this.grandTotal, type: LogComplexEventTypeParameter.DOUBLE },
    //           ]
    //         }
    //       ]
    //     }]
    //   });
    // } else {
    //   firebase.analytics.logComplexEvent({
    //     key: "registered_customer_pay_later_order",
    //     parameters: [{
    //       key: "order",
    //       type: "array",
    //       value: [
    //         {
    //           parameters: [
    //             { key: "cafeId", value: this.cafeid, type: LogComplexEventTypeParameter.STRING },
    //             { key: "uid", value: this.uid, type: LogComplexEventTypeParameter.STRING },
    //             { key: "arrivalTime", value: this.arrivalTime, type: LogComplexEventTypeParameter.STRING },
    //             { key: "grandTotal", value: this.grandTotal, type: LogComplexEventTypeParameter.DOUBLE },
    //           ]
    //         }
    //       ]
    //     }]
    //   });
    // }


      setTimeout(()=>{
        this.zeroQuantityReturn = true;
        this.order.length = 0;
        this.total$ = 0;
        this.discountTotal$ = 0;
        this.totalCharge$ = 0;
        this.tipAmount = 0;
        this.additiveTax = "0";
        this.inclusiveTax = "0";
        this.grandTotal = 0;
        this._location.back();
      },3000)




    // this.cartEmpty.emit(false);
    //this.btnenabled = true;
    //modalcode


    // let options = {
    //   context: { "paymentmode": "cash", "orderNo": a },
    //   fullscreen: true,
    //   viewContainerRef: this.vcRef,
    //
    // };
    // this.popup.showModal(ConfirmationModalComponent, options).then((response) => {
    //   if (response) {
    //     this.orderService.removeCart(this.uid);
    //     setTimeout(() => {
    //       this.routerextensions.navigate(["items", 1],
    //         {
    //           clearHistory: true
    //         });
    //     }, 30)
    //   }
    // });
  }



  goBack(){
    this._location.back()

  }

}
