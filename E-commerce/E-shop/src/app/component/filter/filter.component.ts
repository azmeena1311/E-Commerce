import { Component, OnInit } from '@angular/core';
import{CategoryService} from 'src/app/services/category/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  categories : Category[] =[]
  min : number[] =[];
  max : any[] =[];

  constructor( private categoryservice : CategoryService,private router : Router) { }

  ngOnInit(): void {
    
    Array(10).fill('').forEach((e, index)=>{
      this.min.push((index+1)*100)
    })
    this.collectAllCategory();
  }

  setMaxValue(minValue :number){
    this.max=[];
    console.log(minValue);
    Array(10).fill('').forEach((e, index)=>{
      this.max.push(+minValue + ((index+1)*100))
    })
    this.max.push(this.max[this.max.length-1]+"+")
    
  }

  categorySelected(category_id :string){
    console.log(category_id);
    this.router.navigate([''],
    {
      queryParams:{
        'category' :category_id
      }
    })
  }

  collectAllCategory(){
    this.categoryservice.getAllCategories()
    .subscribe({
      next :(categories) =>{
        this.categories = categories
        console.log(categories);
      },
      error: (response :HttpErrorResponse) =>{
        console.log(response);

      }

    })
  }

}
