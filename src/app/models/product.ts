import { Category } from "./category";
import { User } from "./user";

export interface Product {
    id:number,
    name:string,
    price: number,
    quantity: number,
    category_id: Category
}
