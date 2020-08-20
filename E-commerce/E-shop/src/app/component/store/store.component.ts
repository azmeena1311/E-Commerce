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
      next :(paramMap :ParamMap)=>{
        let categoryId = paramMap.get('category');
        let min = paramMap.get('min');
        let max = paramMap.get('max');
        
        console.log(categoryId);
        this.collectAllproducts({category : categoryId,min,max});
      }
    })
   
  }

  collectAllproducts(params){
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
