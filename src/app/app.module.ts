import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent} from './menu/menu.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';


import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { Alarm, Filter, X } from 'ngx-bootstrap-icons';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FormsModule} from '@angular/forms';
import { ComponentsmodalMenuComponent } from './componentsmodal-menu/componentsmodal-menu.component';
import {MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { OrderComponent } from './order/order.component';
const icons = {
  Alarm,
  Filter,
  X
};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ComponentsmodalMenuComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxBootstrapIconsModule.pick(icons),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [AngularFirestore,    {
    provide: MatDialogRef,
    useValue: {}}],
  bootstrap: [AppComponent],
  entryComponents:[ComponentsmodalMenuComponent]
})
export class AppModule { }
