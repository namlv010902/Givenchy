import { IProduct } from "./products";

export interface ICart{
    _id:string;
    products:IProduct[];
    price:number;
    quantity:number;
    totalPrice:number;
    
}