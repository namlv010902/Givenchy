import { instance } from "./config.service"

const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
const headers: Record<string, string> = {};  //Record<keyType, valueType>.
if (accessToken) {
  headers["Authorization"] = `Bearer ${accessToken}`;
}

export const addToCart = (data: any) => {
  return instance.post('cart/', data, { headers });
}
export const getCart = () => {
  return instance.get('cart/', { headers })
}
export const updateCart = (id:string,data: any) => {
  
  return instance.patch('cart/'+id, data, { headers })
}
export const removeProductInCart = (id:string) => {
  return instance.post('cart/' + id, { headers });
}

