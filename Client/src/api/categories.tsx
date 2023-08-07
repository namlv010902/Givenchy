
import { instance } from "./config"

export const getCategories=()=>{
    return instance.get('categories')
}

export const getCategory=(id:string)=>{
    return instance.get('categories/'+id)
}


