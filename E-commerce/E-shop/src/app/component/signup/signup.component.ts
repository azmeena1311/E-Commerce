import { Component, OnInit } from '@angular/core';
import{User} from 'src/app/models/user.model'
import{UserService} from 'src/app/services/user.service'
import { from } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserOrdersComponent } from '../user-orders/user-orders.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error : boolean = false;
  success :boolean = false;  
  errorMessage :String;
  successMessage :String;

  constructor( private userservice : UserService,private router :Router) { }

  ngOnInit(): void {
  }
  navigateToLoginPage(){
    this.router.navigate(['login'])
  }

  readValuesFromForm(form :HTMLFormElement){
    let name = (<HTMLInputElement>form.elements.namedItem('name')).value
    let email = (<HTMLInputElement>form.elements.namedItem('email')).value
    let password = (<HTMLInputElement>form.elements.namedItem('password')).value
    let phone = (<HTMLInputElement>form.elements.namedItem('phone')).value


    let user : User ={
      name,
      email,
      password,
      phone
    };
    return user;


  }
  signup(event : Event){
    event.preventDefault();
    console.log(event.target);
    let form = <HTMLFormElement>event.target
    let user = this.readValuesFromForm(form)
    this.createUser(user,form);
  }

    createUser(user : User ,form :HTMLFormElement){
      this.userservice.signup(user).subscribe({
        next : (result :{message :String}) =>{
          console.log("User Created");
          this.success = true;
          this.error = false;
          this.successMessage =" User Created successfully"
          form.reset();
          this.navigateToLoginPage()
          
        },
        error: (response :HttpErrorResponse)=>{
          console.log("Not Created");
          this.error = true;
          this.success = false;
          this.errorMessage ="User in the database already"
          
        }
        
      })
  
    }
  

    }
    
    

