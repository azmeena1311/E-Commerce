import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cart ={};
  _cartObservable :BehaviorSubject<Object>;

  constructor() { 
    if(!this.isCartExist()){
      localStorage.setItem('cart',JSON.stringify(this.cart));
    }
    this.readCartDataFromLocalstorage();
    this._cartObservable = new BehaviorSubject(this.cart);
  }

  readCartDataFromLocalstorage(){
    this.cart = JSON.parse(localStorage.getItem('cart'))
  }


  writeCartDataFromLocalstorage(){
    localStorage.setItem('cart',JSON.stringify(this.cart))
  }

  get CartObservable(){
    return this._cartObservable;
  }

  addToCart(product :Product){
    let quantity = this.cart[product._id];

    if(quantity){
      this.cart[product._id] =(+quantity)+1;
    }else{
      this.cart[product._id] =1;
    }

    this._cartObservable.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  isCartExist(){
    if(localStorage.getItem('cart')){
      return true
    }
    else{
      return false
    }
  }


  getQuantity(product :Product){
    
   return this.cart[product._id]? this.cart[product._id]:0;
  }

  removeFromCart(product : Product){

  }

  setQuantity(product :Product,quantity :number){
    if(quantity<1){
      delete this.cart[product._id];
    }else{
      this.cart[product._id] = quantity;
    }
    
    this.writeCartDataFromLocalstorage();
    this._cartObservable.next(this.cart);
  }
}
