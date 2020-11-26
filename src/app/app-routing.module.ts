import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {AppComponent} from './app.component';
import {ComponentsmodalMenuComponent} from './componentsmodal-menu/componentsmodal-menu.component';
import {OrderComponent} from './order/order.component';

const routes: Routes = [
  {
    path: 'home',
    component: AppComponent
  },
  {
    path: "",
    component: AppComponent
  },
  {
    path: 'menu/:id',
    component: MenuComponent
  },
  {
    path: 'menu/:id/:loc',
    component: MenuComponent
  },
  {
    path: "option-pop",
    component: ComponentsmodalMenuComponent
  },
  {
    path: "order",
    component: OrderComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
