import { useContext } from "react";
import { BrandContext, CartContext, CategoryContext, CommentContext, FavoriteContext, OrderContext, ProductContext, SizeContext, UserContext } from "./context";

export const useStoreCart=()=>{
    return useContext(CartContext)
}
export const useStoreComment=()=>{
    return useContext(CommentContext)
}
export const useStoreOrder=()=>{
    return useContext(OrderContext)
}
export const useStoreUser=()=>{
    return useContext(UserContext)
}
export const useStoreCategory=()=>{
    return useContext(CategoryContext)
}
export const useStoreFavorite=()=>{
    return useContext(FavoriteContext)
}
export const useStoreProducts=()=>{
    return useContext(ProductContext)
}
export const useStoreSize=()=>{
    return useContext(SizeContext)
}
export const useStoreBrand=()=>{
    return useContext(BrandContext)
}