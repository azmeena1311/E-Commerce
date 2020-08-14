import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { UserOrdersComponent } from './component/user-orders/user-orders.component';
import { CartComponent } from './component/cart/cart.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';

const routes: Routes = [
  {path :'' , component :HomeComponent},
  {path :'home' , component :HomeComponent},
  {path :'orders' , component :UserOrdersComponent},
  {path :'orders' , component :UserOrdersComponent},
  {path :'cart' , component :CartComponent},
  {path :'login' , component :LoginComponent},
  {path :'signup' , component :SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
