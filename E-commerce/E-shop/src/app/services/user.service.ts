import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { from, BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import{map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSignupUrl ="http://localhost/api/users/signup";

  private userloginurl = "http://localhost/api/users/login";
  private _loginObservable :BehaviorSubject<Object>;


  constructor(private http :HttpClient) { 
    this._loginObservable = new BehaviorSubject({});
  }

  public get loginObservable(){
    return this._loginObservable
  }

  private savetokenToLocalStorage(token: string){
    localStorage.setItem('token',"Bearer "+ token)
  }

  logout(){
    localStorage.removeItem('token');
    this._loginObservable.next({})
  }

  getToken(){
    return localStorage.getItem('token')? localStorage.getItem('token'): "";
  }

  signup(user :User){
    return this.http.post(this.userSignupUrl,user)
    .pipe(
      map(result =>{
      return  <{message :string}>result
      })
    )
  }

  isAdmin(){
    
  }


  login(credentials :{email :string,password :string}){

  return  this.http.post(this.userloginurl,credentials)
  .pipe(
    map((result:loginResponse )=>{

      this.savetokenToLocalStorage(result.token)
      this.loginObservable.next({});
      return <loginResponse>result
    })
  )

  }
}


interface loginResponse{
  token :string,
  message :string
}