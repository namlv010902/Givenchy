import { IProduct } from "./products";

export interface ICart{
    _id:string;
    products:IProduct[];
    totalPrice:number;
    
}