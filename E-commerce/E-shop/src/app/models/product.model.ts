import{Category} from './category.model'


export interface Product {
    _id: string;
    name: string;
    price: number;
    category: Category;
    productImage: string;
  }
  