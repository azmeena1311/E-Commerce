import { Component, OnInit, Input } from '@angular/core';
import{Product} from 'src/app/models/product.model'
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import{orderInfo,ProductInfo, OrderService} from 'src/app/services/order/order.service'
import { Router } from '@angular/router';




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
  modalRef: BsModalRef
  

  constructor(private cartService : CartService,
    private modalService : BsModalService,
    private productService : ProductService,
    private orderService : OrderService,
    private router :Router) { }

  ngOnInit(): void {
    this.subscribeCart();

  }
  



  subscribeCart(){
    let total =0;

    this.cartService.CartObservable.subscribe(
      {
         next : (cart) =>{
           
           let observables =[];
           total =0;
           if(Object.keys(cart).length ==0){
             this.cartItems =[]
           }
           for(let id in cart){
            console.log(id);
            observables.push(
              this.productService.getAllProductsById(id)
              .pipe(
                map(product =>{
                 total += (product.price * cart[id])
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
            this.total =total;
            this.cartItems = cartItems;
             console.log(this.cartItems);
             
           }
         })
      }
    })
  }



  openModal(form){  
    this.modalRef = this.modalService.show(form ,
      {
        animated : true , 
        class : 'modal-lg'
      })
  }

  //checkout

  checkout(event :Event,form :HTMLFormElement){
    event.preventDefault();
    let firstName = (<HTMLFormElement>form.elements.namedItem('firstName')).value
    let lastName = (<HTMLFormElement>form.elements.namedItem('lastName')).value
    let address = (<HTMLFormElement>form.elements.namedItem('address')).value

    let orderInfo : orderInfo;
    let productInfos :ProductInfo[]=[];
    this.cartItems.forEach(e=>{
      productInfos.push({
        price :e.product.price,
        productId:e.product._id,
        quantity : e.quantity
      })

    })

    orderInfo ={
      address,
      firstName,
      lastName,
      products:productInfos
    }

    console.log(orderInfo);

    this.orderService.placeOrder(orderInfo)
    .subscribe({
      next :(result)=>{
        this.modalRef.hide();
        this.cartService.clearCart()
        this.router.navigate(['orders'])

      },
      error :(err)=>{
        console.log({'err' : 'Cant place order ..'});
        
      }
    })

    return false;
    
  }
  }

  
