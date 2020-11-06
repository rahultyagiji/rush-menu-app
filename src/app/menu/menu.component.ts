import {Component, OnInit} from '@angular/core';
// import data from "../../assets/data.json";
import {Menu} from "../datatypes/menu";
import {ActivatedRoute} from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { Observable } from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

import {Item} from '../datatypes/item';
import {FirebaseDatabase} from '@angular/fire';


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
              public fb: AngularFireDatabase) {

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
          .valueChanges().subscribe((res)=>{
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
      console.log(firebase.firestore.FieldValue.serverTimestamp())
     this.fb.list('xcovidContactInfo').push(
       {"name":document.getElementById('form1').value,
        "email":document.getElementById('form2').value,
         "phone":document.getElementById('form3').value,
         "cafeId":this.cafe,
         "timeStamp":firebase.firestore.Timestamp.now()
       })
    }
    else{
      this.detailsObtained=true;
    }
  }

}

