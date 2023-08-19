import { IProduct } from "./products";
import { ISize } from "./size";

export interface ICart {
    _id: string;
    sizeId:ISize,
    productId: IProduct,
    quantity: number,
    price: number
    totalPrice: number;

}