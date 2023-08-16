import { IBrand } from "./brand";
import { ICate } from "./categories";
import { ISize } from "./size";
export interface IResSize{
    sizeId:ISize, 
    price:number,
    inStock:number,
    unitsSold:number
}
export interface IProduct{
    _id:string;
    name:string;
    image:string;
    description:string;
    categoryId:ICate;
    sizes:IResSize[],
    brandId:IBrand
    gender:string
}