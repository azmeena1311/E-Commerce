import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form :HTMLFormElement
  error : boolean = false;
  success :boolean = false;  
  errorMessage :String;
  successMessage :String;
   


  constructor(private userservice : UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(event :Event){
    event.preventDefault();
    console.log(event.target);
    this.form = <HTMLFormElement>event.target
    this.readFormValues();
  }

readFormValues(){

  let email = (<HTMLFormElement>this.form.elements.namedItem('email')).value
  let password = (<HTMLFormElement>this.form.elements.namedItem('password')).value

  let credentials = {
    email,password
  }
console.log(credentials);

this.userservice.login(credentials).subscribe({
  next :(result)=>{
    console.log(result);
    this.success = true;
    this.error = false;
    this.successMessage = result.message;
    
    this.navigateToHomePage()
   
  },
  error : (response :HttpErrorResponse)=>{
    console.log(response.error);
    this.error = true;
          this.success = false;
          this.errorMessage ="User in the database already"
          
  }
})

}
  navigateToHomePage() {
    this.router.navigate(['home'])
      }


}
