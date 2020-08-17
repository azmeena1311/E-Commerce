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


  getAllProducts(){
    return this.http.get(this.getAllProductURL,
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
}
