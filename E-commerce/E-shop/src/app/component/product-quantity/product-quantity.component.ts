import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {



  @Input()
  product :Product

  quantity :number =0;
  constructor( private cartService : CartService) { }

  ngOnInit(): void {

    this.cartService._cartObservable.subscribe({
      next : (cart)=>{
       this.quantity =  this.cartService.getQuantity(this.product)
       console.log(this.quantity);
       
      }
    })
    
  }

  minusQuantity(){
    this.quantity --;
    this.cartService.setQuantity(this.product , this.quantity)
  }

  plusQuantity(){
    this.quantity++;
    this.cartService.setQuantity(this.product , this.quantity)
  }

}
