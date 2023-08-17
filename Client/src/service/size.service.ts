import { getAuthorizationHeaders, instance } from "./config.service"
const headers = getAuthorizationHeaders()
export const getSizes=()=>{
    return instance.get("size")
}
export const getProductsBySize=(id:string)=>{
    return instance.get("size/"+id)
}