import { Injectable } from '@angular/core';
import {Menu} from './datatypes/menu';
import {Order} from './datatypes/order';
import {BehaviorSubject} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  price: string = "0";
  priceQuantity: string = "0";
  order: Order[] = [];

  private _order = new BehaviorSubject<Order[]>([]);



  constructor(
    public fb: AngularFireDatabase,
    private toastr: ToastrService

  ) {

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


  confirmOrder(order: Order[], cafe, payway, uid, location, totalPrice, discount, curr, arrival, tip, additiveTax, inclusiveTax, address) {
    if (this.order.length != 0) {

      var time = Math.floor(Date.now() / 1000);
      var a = this.orderNo();
      // var dId = this.auth.getDeviceIdHash();

      if (payway == "Cash") {

        this.fb.list('/order-cafe/' + cafe).push(
          {
            "print": true,
            order,
            "status": "ordered",
            "uid": uid,
            "location": location,
            "orderNo2": a,
            "timestamp": time,
            "totalPrice": totalPrice,
            "paymentBalance": totalPrice,
            "payway": "Cash",
            "discount": discount,
            "currency": curr,
            "arrivalTime": arrival,
            "tip": tip,
            "additiveTax": additiveTax,
            "inclusiveTax": inclusiveTax,
            "deliveryDetails": address
          })
          .then((res) => {
            this.toastr.success('Your order# is ' + a, 'Order Confirmed',{
              positionClass: 'toast-center-center',
              timeOut: 3500
            });


            // if (uid == dId) {
      //         firebase.update('/order-user/' + dId, {
      //           "status": "ordered",
      //           "cafe": cafe,
      //           "orderNo": res.key,
      //           "orderNo2": a,
      //           "timestamp": time,
      //           "payway": "Cash",
      //           "discount": discount,
      //           "currency": curr,
      //           "arrivalTime": arrival
      //         })
      //           .then(() => {
      //               firebase.remove('/cart/' + dId + '/' + cafe);
      //             }
      //           )
      //           .catch(() => {
      //             //    fix this so that there is no inconsistency between user and cafe tables
      //           })
      //       // } else {
      //     //     firebase.push('/order-user/' + uid, {
      //     //       "status": "ordered",
      //     //       "cafe": cafe,
      //     //       "orderNo": res.key,
      //     //       "orderNo2": a,
      //     //       "timestamp": time,
      //     //       "payway": "Cash",
      //     //       "discount": discount,
      //     //       "currency": curr,
      //     //       "arrivalTime": arrival
      //     //     })
      //     //       .then(() => {
      //     //           firebase.remove('/cart/' + uid + '/' + cafe);
      //     //
      //     //         }
      //     //       )
      //     //       .catch(() => {
      //     //         //    fix this so that there is no inconsistency between user and cafe tables
      //     //       })
      //     //   }
      //     // })
      //     // .catch((err) => {
      //     // })
      //
      // }
    //   else {
    //     firebase.push('/order-cafe/' + cafe, {
    //       "print": true,
    //       order,
    //       "status": "ordered",
    //       "uid": uid,
    //       "location": location,
    //       "orderNo2": a,
    //       "timestamp": time,
    //       "totalPrice": totalPrice,
    //       "paymentBalance": 0,
    //       "payway": "Card",
    //       "discount": discount,
    //       "currency": curr,
    //       "arrivalTime": arrival,
    //       "tip": tip,
    //       "additiveTax": additiveTax,
    //       "inclusiveTax": inclusiveTax,
    //       "deliveryDetails": address
    //     })
    //       .then((res) => {
    //           if (uid == dId) {
    //             firebase.update('/order-user/' + dId, {
    //               "status": "ordered",
    //               "cafe": cafe,
    //               "orderNo": res.key,
    //               "orderNo2": a,
    //               "timestamp": time,
    //               "payway": "Card",
    //               "discount": discount,
    //               "currency": curr,
    //               "arrivalTime": arrival
    //             })
    //               .then(() => {
    //                   firebase.remove('/cart/' + dId + '/' + cafe);
    //                 }
    //               )
    //               .catch(() => {
    //                 //    fix this so that there is no inconsistency between user and cafe tables
    //               })
    //           } else {
    //             firebase.push('/order-user/' + uid, {
    //               "status": "ordered",
    //               "cafe": cafe,
    //               "orderNo": res.key,
    //               "orderNo2": a,
    //               "timestamp": time,
    //               "payway": "Card",
    //               "discount": discount,
    //               "currency": curr,
    //               "arrivalTime": arrival
    //             })
    //               .then(() => {
    //                 firebase.remove('/cart/' + uid + '/' + cafe)
    //               })
    //           }
    //         }
    //       ).catch((err) => {
    //       console.log("error is ", err)
    //     })
    //   }
    //   return a;
    // }
  })
      }
    }
  }

  orderNo() {
    var i;
    var allc = "ABCDEFGHIJKJLMNOPQRSTUVWXYZ";
    var orderAlphabet = '';
    for (i = 0; i < 1; i++) {
      orderAlphabet += allc.charAt(Math.floor(Math.random() * allc.length));
    }
    i = 0;

    return orderAlphabet + (Math.floor(Math.random() * (50 - 1 + 1)) + 1).toString();
  }


}
