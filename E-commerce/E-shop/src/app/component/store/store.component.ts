import { Component, OnInit } from '@angular/core';
import{ProductService} from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {


  products : Product[] =[];
  constructor(private productService :ProductService , private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next :(paramsMap :ParamMap)=>{
        let categoryId = paramsMap.get('category');
        console.log(categoryId);
        this.collectAllproducts({category : categoryId});
      }
    })
   
  }

  collectAllproducts(params ){
    this.productService.getAllProducts(params)
    .subscribe({
      next : (products)=>{
        this.products = products
        console.log(this.products);
        
      },
      error : (error)=>{
        console.log(error);
      }
    })
  }

}
