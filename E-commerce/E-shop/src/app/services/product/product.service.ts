import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import{Product} from 'src/app/models/product.model'
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  

  getAllProductURL ='http://localhost/api/products'
  constructor(private http :HttpClient,private userService :UserService) { }


  getAllProducts(params){
    let query =  new URLSearchParams();
    if(params['category']){
      query.append('category',params['category'])
    }
    return this.http.get(`${this.getAllProductURL}?${query.toString()}`,
      {
        headers:{
          'authorization' : this.userService.getToken()
        }
      })
      .pipe(
        map((result : {count :Number, products: Product[]})=>{
          return result.products
        })
      )
  }


  getAllProductsById(id : string){
    return this.http.get(`${this.getAllProductURL}/${id}`,
      {
        headers:{
          'authorization' : this.userService.getToken()
        }
      })
      .pipe(
        map((result)=>{
          return <Product>result
        })
      )
  }
}
