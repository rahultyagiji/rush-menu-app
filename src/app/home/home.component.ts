import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService} from '../config.service';
import {Item} from '../datatypes/item';
import {AngularFireDatabase} from '@angular/fire/database';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public showSearch:boolean = false;
  public cafeId:string="";
  public vSearchText:string=''
  public item:Item[]=[]
  public itemDisplay: Item[]=[]

    constructor(private router:Router,
                private configService: ConfigService,
                 public fb: AngularFireDatabase){}

    ngOnInit(): void {


      this.configService.setConfig();
    if (this.router.url=='/'){
      this.showSearch = true;
      this.fb.list('businessName').
        valueChanges().subscribe((res: Item[]) =>
          this.item = res.slice())

    }
  }


searchItems(){

  if (this.vSearchText != '') {
    const searchValue = this.vSearchText.toLowerCase().trim();
    this.itemDisplay = this.item.filter(item => {
      return `${item.name} ${item.name}`.toLowerCase().indexOf(searchValue.toLowerCase()) > -1});
  }
  else{
    this.itemDisplay.length=0;
  }
  }

  navigateToMenu(item){
    this.router.navigate(['/menu/'+item.cafeId])
  }

}
