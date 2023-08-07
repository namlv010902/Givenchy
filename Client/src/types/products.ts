import { ICate } from "./categories";
 interface ISize{
    sizeId:string, 
    price:number,
    inStock:number 
}
export interface IProduct{
    _id:string;
    name:string;
    image:string;
    description:string;
    categoryId:ICate;
    sizes:ISize[],
    brandId:string
}