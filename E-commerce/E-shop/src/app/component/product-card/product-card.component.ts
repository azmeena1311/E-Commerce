import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import{CartService}  from 'src/app/services/cart/cart.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product')
  product : Product ;

  quantity: number = 0;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService._cartObservable.subscribe({
      next : (cart)=>{
        this.quantity = this.cartService.getQuantity(this.product)
      }
    })


   
    
  }

  addToCart(){
    this.cartService.addToCart(this.product);
   

    
  }

  
}
