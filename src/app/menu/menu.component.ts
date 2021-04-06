import {Component, OnInit, Inject, Injectable } from '@angular/core';
import {Menu, MenuDisplay} from '../datatypes/menu';
import {ActivatedRoute, Router} from '@angular/router';
import 'firebase/firestore';
import moment from 'moment';


import { Observable } from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

import {Item} from '../datatypes/item';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ComponentsmodalMenuComponent} from '../componentsmodal-menu/componentsmodal-menu.component';
import {OrderService} from '../order.service';
import {Order} from '../datatypes/order';
import {AppService} from '../app.service';
import {keyframes} from '@angular/animations';



@Component({
  selector: 'app-menu-component',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host: {
    "(window:resize)":"onWindowResize($event)"
  }
})
export class MenuComponent implements OnInit {
  public menu:Menu[]=[]
  public cafeInfo:Item
  public menuDisplay:MenuDisplay[]=[]
  public menuDisplayUnfiltered:MenuDisplay[]=[]
  public cart:MenuDisplay[]=[];
  public selectedMenu:Menu;
  public categories:string[]=["All"];
  public openFilter:boolean=false;
  public showimage:boolean=true;
  public detailsObtained:boolean=false;
  public vName:string=""
  public vEmail:string=""
  public vPhone:string=""
  public vSearchText:string=""
  public vtext:string="Menu"
  public tableNum:string=""
  public tabChargeCode:string=""


  //screen size
  isMobile: boolean = false;
  width:number = window.innerWidth;
  height:number = window.innerHeight;
  mobileWidth:number  = 500;
  currency:string="USD";
  deviceInfo = null;
  openOrderHistory:boolean=false;

  order: Order[] = [];
  total$: number = 0;
  discountTotal$: number = 0;
  itemCount: number = 0;
  ifOrderFound:boolean=false;
  oldOrderNumber:string=""
  oldOrderDetails: Order[]
  oldOrderPrice:string=""
  oldOrderCafeId:string=""

  isCardAllowed:boolean = false;
  isCashAllowed:boolean = false;
  isPinProvided:boolean = false;
  isPinNotMatching:boolean = false;
  tabPin:string="";
  tabCode:string=""
  tabPinInput:string="";


  items: Observable<any[]>;

  oldSessionData:{orderNo:string,totalPrice:string,order:Order[],cafe:string}[]=[];


  constructor(public route: ActivatedRoute,
              public router: Router,
              public fb: AngularFireDatabase,
              public matDialog: MatDialog,
              public orderService: OrderService,
              public appService: AppService)
  {


    this.route.params.subscribe(
      params => {
        this.cafe = params['id'];
        this.tableNum = params['loc'];
        this.orderService.setTableNumber(params['loc'])

        if(typeof params['loc'] != 'undefined') {
            this.tabChargeCode = params['loc']
        }
        else {
          this.isPinProvided = true;
        }
      }
    );

  }

  cafe:string=""
  cafeName:string=""
  imgSrc:string=""

  ngOnInit() {

    this.width = window.innerWidth
    this.height = window.innerHeight
    this.isMobile = window.innerWidth < this.mobileWidth;
    if (!this.isMobile) {
      this.showimage = false;
    } else {
      this.showimage = true;
    }

    const ref = '/menu/' + this.cafe
    this.fb.list('businessName',ref => ref.orderByChild('cafeId').equalTo(this.cafe))
      .valueChanges().subscribe((res:Item[])=>{
      this.cafeInfo = res[0];
      this.isCardAllowed = res[0].card;
      this.isCashAllowed = res[0].cash;
      this.appService.setCafeInfo(this.cafeInfo)
      this.cafeName=res[0].name
      this.imgSrc =res[0].imgSrc
      if(typeof res[0].tabList != "undefined"){

        var a = false;
        res[0].tabList.forEach((x)=>{
          if(this.tabChargeCode === x.name){
            this.orderService.setTab(x.name);
            this.tabPin = x.pin
            a = true;
          }
        })
        setTimeout(()=>{
          if(!a){
            this.isPinProvided = true;
          }
        },1000)

      }
      else{
        this.isPinProvided=true;
      }

    })

    this.fb.list<Menu>(ref).valueChanges().subscribe((res) => {
      this.menu = res.slice()

      res.forEach((x) => {
        var a = this.checkAvailability(x.available.timing.startTime, x.available.timing.endTime, x.available.inStock)
        this.menuDisplay.push(
          {
            item: x.item,
            imgSrc: x.imgSrc,
            name: x.name,
            price: x.price,
            category: x.category,
            description: x.description,
            option: x.option,
            extra: x.extra,
            available: a,
            tax: x.tax
          })
        this.menuDisplayUnfiltered.push({
          item: x.item,
          imgSrc: x.imgSrc,
          name: x.name,
          price: x.price,
          category: x.category,
          description: x.description,
          option: x.option,
          extra: x.extra,
          available: a,
          tax: x.tax
        })
      })
    })


      setTimeout(()=>{
        this.orderService.getOrder().subscribe((x) => {
          this.order = x;
          if (this.order.length > 0) {
            let orderCount = 0;
            for (let i = 0; i < this.order.length; i++) {
              orderCount = orderCount + this.order[i].quantity;
            }
            this.itemCount = orderCount;
            //this.itemCount=this.order.length;
            this.totalPrice(x);
          }})
      },300)

    this.oldSessionData = JSON.parse(sessionStorage.getItem("dataRush"))

    if (this.oldSessionData!= null && this.oldSessionData.length>0){
      if(this.oldSessionData[0].cafe === this.cafe)
      {
        this.ifOrderFound = true;
        this.oldOrderCafeId = this.oldSessionData[0].cafe
     }
      }

    if(!this.isPinProvided){
      this.isPinProvided =  this.orderService.fetchPin()
    }

  }


  clickFilter(){
    this.openFilter=true;
    this.menu.forEach((x)=>{
      this.categories.push(x.category)
    })
    this.categories = this.categories.filter((item, i, ar) => ar.indexOf(item) === i).slice();
  }
  closeFilter(){
    this.openFilter=false;
    this.openOrderHistory=false;
  }

  filterCat(cat){
    this.openFilter=false;
    if(cat=='All'){
      this.menuDisplay=this.menuDisplayUnfiltered.slice();
      this.vtext = 'Menu';
    }
    else{
      this.vtext = cat;
      this.menuDisplay =  this.menuDisplayUnfiltered.filter(function(item) {
        return item.category == cat;
      });
    }
  }


  onWindowResize(event) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    this.isMobile = this.width < this.mobileWidth;
    if (!this.isMobile){
      this.showimage=false;
    }
    else{
      this.showimage=true;
    }
  }


  fetchCovidTracingDetails(response:number){

    if(response==1) {
      this.detailsObtained = true;
     // this.fb.list('xcovidContactInfo').push(
     //   {"name":<HTMLInputElement>document.getElementById('form1').value,
     //    "email":<HTMLInputElement>document.getElementById('form2').value,
     //     "phone":<HTMLInputElement>document.getElementById('form3').value,
     //     "cafeId":this.cafe,
     //     "timeStamp":firebase.firestore.Timestamp.now()
     //   })
    }
    else{
      this.detailsObtained=true;
    }
  }


  openModal(i) {
  //   this.router.navigate(["option-pop"])
  // }
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = '';
    dialogConfig.backdropClass = 'class-backdrop';
    dialogConfig.width = '100vw';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '600px',
      dialogConfig.position = {
    left: '10%',
    top: '0%'
      }
    dialogConfig.data = {
      menu:this.menuDisplay[i],
      isOnboarded:this.cafeInfo.onboarded,
      isAvailable:this.cafeInfo.available
    }
    const modalDialog = this.matDialog.open(ComponentsmodalMenuComponent, dialogConfig)

    modalDialog.beforeClosed().subscribe(result => {
      if(result.order=='1'){
        this.cart.push(this.menuDisplay[i])
        //remember to fix quantity later....
        this.orderService.Order(this.menuDisplay[i], this.cafe, result.specialInstruction, result.option, result.extras, 1, false);

        this.orderService.getOrder().subscribe((x) => {
          this.order = x;
          if (this.order.length > 0) {

          }})

        this.totalPrice(this.order);
        let orderCount = 0;
        for (let i = 0; i < this.order.length; i++) {
          orderCount = orderCount + this.order[i].quantity;
        }
        this.itemCount = orderCount;
      }
    });
  }

  onClickCart(){
    this.orderService.setPin(this.isPinProvided)
    this.router.navigate(['order']);
  }

  totalPrice(order: Order[]) {
    this.total$ = 0;
    order.forEach((x) => {
      //for total
      this.total$ = Math.round((this.total$ + parseFloat(x.priceQuantity)) * 100) / 100;
    });
    this.discountTotal$ = Math.round(this.total$ * (1 - this.cafeInfo.discount / 100) * 100) / 100;
  }


  searchMenuItem(){
    if (this.vSearchText != '') {
      const searchValue = this.vSearchText.toLowerCase().trim();
      this.menuDisplay = this.menuDisplayUnfiltered.filter(item => {
        return `${item.name} ${item.name}`.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || `${item.category} ${item.category}`.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || `${item.description} ${item.description}`.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
      });
    }
    else{
      this.menuDisplay =  this.menuDisplayUnfiltered.slice()
    }
  }

  checkAvailability(startTime, endTime, inStock) {

    var st = moment(startTime, "HH:mm");
    var et = moment(endTime, "HH:mm");



    if (inStock == false) {
      return false
    }
    else {
      if (moment(moment()).isBetween(st, et)) {
        return true;
      }
      else {
        return false;
      }
    }
  }


  viewOrderDetails(){
    this.openOrderHistory=true;
    var oldSessionData = sessionStorage.getItem("dataRush")

  }


  checkTabPin(){
    if(this.tabPin == this.tabPinInput && this.tabPin != ''){
      this.isPinProvided = true;
      this.isPinNotMatching = false;
    }
    else{
        this.isPinNotMatching = true;
    }
  }
}

