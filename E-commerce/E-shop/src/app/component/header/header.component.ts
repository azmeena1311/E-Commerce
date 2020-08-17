import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  numberofItems :number =0;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.CartObservable.subscribe({
      next :(cart) =>{
        console.log(cart);

        this.numberofItems = Object.keys(cart).length
        
      }
    })
  }

}
