import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  numberofItems :number =0;
  isAdmin$;
  constructor(private cartService : CartService,private userService : UserService, private router :Router) { }

  ngOnInit(): void {
    this.cartService.CartObservable.subscribe({
      next :(cart) =>{
        console.log(cart);

        this.numberofItems = Object.keys(cart).length
        
      }
    })

    this.userService.loginObservable.subscribe({
      next : () =>{
        let token = this.userService.getToken();
        if(token!=''){
          this.isLoggedIn = true;
        }else{
          this.isLoggedIn = false;
        }
      }
    })
  }

checkAdmin(){
  this.isAdmin$ = this.userService.isAdmin();
}


logout(){

  this.userService.logout();
  this.router.navigate(['login']);
}

}
