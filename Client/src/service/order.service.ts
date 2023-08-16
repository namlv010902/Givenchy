
import { instance } from "./config.service"
const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
const headers: Record<string, string> = {};  //Record<keyType, valueType>.
if (accessToken) {
  headers["Authorization"] = `Bearer ${accessToken}`;
}

export const createOrder = (data: any) => {
    return instance.post('order/', data, { headers })
}
export const getUserOrder = () => {
    return instance.get('orderUser/', { headers })
}
export const filterOrder = (status: string) => {
    return instance.post('orderFilter/' , { status: status })
}
export const orderDetail = (id: string) => {
    return instance.get('order/' + id, { headers })
}
export const cancelOrder = (id: string) => {
    return instance.delete('order/' + id, { headers })
}
export const resetOrder = (id: string) => {
    return instance.post('order/' + id)
}
