import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { from } from 'rxjs';
import { User } from '../models/user.model';
import{map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSignupUrl ="http://localhost/api/users/signup";

  private userloginurl = "http://localhost/api/users/login";
  constructor(private http :HttpClient) { }

  signup(user :User){
    return this.http.post(this.userSignupUrl,user)
    .pipe(
      map(result =>{
      return  <{message :string}>result
      })
    )
  }


  login(credentials :{email :string,password :string}){

  return  this.http.post(this.userloginurl,credentials)
  .pipe(
    map(result =>{
      return <loginResponse>result
    })
  )

  }
}


interface loginResponse{
  token :string,
  message :string
}