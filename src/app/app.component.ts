import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title:string  = '';

  public cafeId:string="";

  constructor(private router:Router){}

  ngOnInit(): void {
  }


}