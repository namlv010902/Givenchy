import { instance } from "./config"

export const createComment=(data:any)=>{
    return instance.post("comment", data)
}
export const getCommentProduct=(idProduct:string)=>{
    return instance.get("comment/"+ idProduct)
}