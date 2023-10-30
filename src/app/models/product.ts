import { Category } from "./category";
import { User } from "./user";

export interface Product {
    id:number,
    name:string,
    price: number,
    quantity: number,
    user_id: User,
    category_id: Category
}
