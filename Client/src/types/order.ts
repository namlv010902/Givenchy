import { IProduct } from "./products";

export interface IOrder{
    _id:string,
    cartId:string,
    userId:string,
    products:IProduct[],
    OrderDate:Date,
    pay:boolean,
    DeliveryDate:Date,
    status:string,
    totalPrice:number,
    phone:string,
    note:string,
    address:string

    

}