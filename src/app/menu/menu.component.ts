import {Component, OnInit} from '@angular/core';
// import data from "../../assets/data.json";
import {Menu} from "../datatypes/menu";
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { Observable } from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

import {Item} from '../datatypes/item';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ComponentsmodalMenuComponent} from '../componentsmodal-menu/componentsmodal-menu.component';


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
  public menuDisplay:Menu[]=[]
  public cart:Menu[]=[];
  public selectedMenu:Menu;
  public categories:string[]=["All"];
  public openFilter:boolean=false;
  public showimage:boolean=true;
  public detailsObtained:boolean=false;
  public vName:string=""
  public vEmail:string=""
  public vPhone:string=""


  //screen size
  isMobile: boolean = false;
  width:number = window.innerWidth;
  height:number = window.innerHeight;
  mobileWidth:number  = 500;
  currency:string="USD";

  items: Observable<any[]>;

  constructor(public route: ActivatedRoute,
              public router:Router,
              public fb: AngularFireDatabase,
              public matDialog: MatDialog) {

  }

  cafe:string=""
  cafeName:string=""
  imgSrc:string=""

  ngOnInit() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.isMobile = window.innerWidth < window.innerHeight;
    if (!this.isMobile) {
      this.showimage = false;
    } else {
      this.showimage = true;
    }


    this.route.params.subscribe(
      params => {
        this.cafe = params['id'];
        const ref = '/menu/' + params['id']

        this.fb.list('businessName',ref => ref.orderByChild('cafeId').equalTo(this.cafe))
          .valueChanges().subscribe((res:Item[])=>{
            this.cafeName=res[0].name
            this.imgSrc =res[0].imgSrc
          })

        this.fb.list<Menu>(ref).valueChanges().subscribe((res) => {
          this.menu = res.slice()
          this.menuDisplay = res.slice()
        })

      }
    );

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
  }

  filterCat(cat){
    this.openFilter=false;
    if(cat=='All'){
      this.menuDisplay=this.menu.slice();
    }
    else{
      this.menuDisplay =  this.menu.filter(function(item) {
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
     this.fb.list('xcovidContactInfo').push(
       {"name":<HTMLInputElement>document.getElementById('form1').value,
        "email":<HTMLInputElement>document.getElementById('form2').value,
         "phone":<HTMLInputElement>document.getElementById('form3').value,
         "cafeId":this.cafe,
         "timeStamp":firebase.firestore.Timestamp.now()
       })
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
    dialogConfig.id = 'modal-component';
    dialogConfig.backdropClass = 'class-backdrop';
    dialogConfig.width = this.width.toString()
    dialogConfig.maxWidth = this.width,
    dialogConfig.maxHeight = '500px',
      dialogConfig.position = {
    left: '20%',
    top: '0%'
      }
      dialogConfig.position = {
      'top':'10px'
      }
    dialogConfig.data = {
      menu:this.menuDisplay[i]
    }
    const modalDialog = this.matDialog.open(ComponentsmodalMenuComponent, dialogConfig)

    modalDialog.beforeClosed().subscribe(result => {
      if(result=='1'){
        this.cart.push(this.menuDisplay[i])
        console.log(this.cart)
      }
    });
  }
  onClickCart(){
    console.log("navigate to confirm page")
  }

}

