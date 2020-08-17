import { Component, OnInit, Input } from '@angular/core';
import{Product} from 'src/app/models/product.model'
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';




interface cartItem{
product :Product
quantity :number
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart;
  cartItems : cartItem[] =[];
  total: number =0;
  

  constructor(private cartService : CartService,private productService : ProductService) { }

  ngOnInit(): void {
    this.subscribeCart();

  }



  subscribeCart(){

    this.cartService.CartObservable.subscribe(
      {
         next : (cart) =>{
           this.cartItems =[];
           let observables =[];
           for(let id in cart){
            console.log(id);
            observables.push(
              this.productService.getAllProductsById(id)
              .pipe(
                map(product =>{
                  this.total += (product.price * cart[id])
                  let item : cartItem={
                    product :product,
                    quantity :cart[id]
                  }

                  return item;
                })
              ));
            
            // .subscribe({
            //   next :(product)=>{
               
            //     let  item :cartItem ={
            //       product :product,
            //       quantity :cart[id]
            //     }
            //     this.cartItems.push(item)
            //     console.log(this.cartItems);
            //   }
            // })}
           
           
         }

         forkJoin(observables).subscribe({
           next :(cartItems :cartItem[]) =>{

            this.cartItems = cartItems
             console.log(this.cartItems);
             
           }
         })
      }
    })
  }
  }

  
