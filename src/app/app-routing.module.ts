import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {AppComponent} from './app.component';

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
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
