import { useEffect, useState } from "react";
import { IProduct } from "../types/products";
import { getAll } from "../api/products";
export const getAllProduct=()=>{
        const [products, setProducts]= useState<IProduct[]>()
        useEffect(()=>{
         getAll().then(({data})=>setProducts(data.product.docs)
         )
        },[])
        // console.log("all products",products);
        return products
                
   
}