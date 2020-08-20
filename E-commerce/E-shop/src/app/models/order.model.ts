import{Product} from '../models/product.model';
import{User} from '../models/user.model';

export interface Order{
    quantity :number;
    paymentMethod :string;
    status :string;
    _id :string;
    product :Product;
    price :number;
    user :User;
    firstName :string;
    lastName :string;
    address :string;
    created_at :string;
    updated_at :string;
    __v: number;
}