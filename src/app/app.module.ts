import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

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
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';

import { OrderComponent } from './order/order.component';
import { ToastrModule } from 'ngx-toastr';
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
    OrderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxBootstrapIconsModule.pick(icons),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatCheckboxModule,
    MatListModule,
    FormsModule,
    MatDialogModule,
    MatRadioModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AngularFirestore,    {
    provide: MatDialogRef,
    useValue: {}}],
  bootstrap: [AppComponent],
  entryComponents:[ComponentsmodalMenuComponent]
})
export class AppModule { }
