import { useContext } from "react";
import { CartContext, CommentContext, OrderContext, UserContext } from "./context";

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