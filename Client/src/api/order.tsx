
import { instance } from "./config"

export const createOrder=(data:any)=>{
    return instance.post('order/',data)
}
export const getUserOrder=(idUser:string)=>{
    return instance.get('orderUser/'+idUser)
}
export const filterOrder=(status:string,idUser:string)=>{
    return instance.post('orderFilter/'+idUser, {status:status})
}
export const orderDetail=(id:string)=>{
    return instance.get('order/'+id)
}
export const cancelOrder=(id:string)=>{
    return instance.delete('order/'+id)
}
export const resetOrder=(id:string)=>{
    return instance.post('order/'+id)
}
