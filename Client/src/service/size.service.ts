import { instance } from "./config.service"

export const getSizes=()=>{
    return instance.get("size")
}
export const getProductsBySize=(id:string)=>{
    return instance.get("size/"+id)
}