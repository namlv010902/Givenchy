
import { instance } from "./config"
export const addToCart=(data:any)=>{
   
    return instance.post('cart/',data)
}
export const getCart=(userId:any)=>{
    // console.log(userId);
    return instance.get('cart/'+userId)
}
export const updateCart=(data:any)=>{
   console.log(data);
    return instance.patch('cart/',data)
}
export const removeProductInCart = (idProduct: string,sizeId:string, userId: string) => {
  const data={
    userId,
    sizeId
   }
    return instance.post('cart/' + idProduct,data);
  }
  
  