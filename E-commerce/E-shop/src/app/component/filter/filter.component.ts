import { Component, OnInit } from '@angular/core';
import{CategoryService} from 'src/app/services/category/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  categories : Category[] =[]

  constructor( private categoryservice : CategoryService) { }

  ngOnInit(): void {
    this.collectAllCategory();
  }

  categorySelected(category_id :string){
    console.log(category_id);
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
