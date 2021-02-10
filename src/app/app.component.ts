import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ConfigService} from './config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title:string  = '';

  public cafeId:string="";

  constructor(private router:Router,
               private configService: ConfigService ){}

  ngOnInit(): void {
    this.configService.setConfig();
  }


}
