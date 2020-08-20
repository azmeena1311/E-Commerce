import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';
import{Order} from 'src/app/models/order.model';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderPlaceURL :'http://localhost/api/orders';
  userAllOrderUrl = 'http://localhost/api/orders';
  constructor(private http :HttpClient,private userService :UserService) { }

  placeOrder(orderInfo : orderInfo){
    let headers = new HttpHeaders({
      'authorization' : this.userService.getToken()
    })
    return this.http.post(this.orderPlaceURL,orderInfo,{headers})
  }


  getUserOrder(){
    let headers = new HttpHeaders({
      'authorization' : this.userService.getToken()
    })
    return this.http.get(this.userAllOrderUrl,{headers}).pipe(
      map((result :{count:number,orders:Order[]})=>{
        return result.orders
      })
    )
  }



}


export interface orderInfo{
  firstName :string;
  lastName :string;
  address :string;
  products :ProductInfo[];
}


export interface ProductInfo {
  productId :string;
  quantity :number;
  price :number;

}