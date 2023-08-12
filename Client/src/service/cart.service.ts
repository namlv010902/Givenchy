import { instance } from "./config.service"

const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
const headers: Record<string, string> = {};  //Record<keyType, valueType>.
if (accessToken) {
  headers["Authorization"] = `Bearer ${accessToken}`;
}

export const addToCart = (data: any) => {
  return instance.post('cart/', data, { headers });
}
export const getCart = (userId: any) => {

  return instance.get('cart/' + userId, { headers })
}
export const updateCart = (id:string,data: any) => {
  
  return instance.patch('cart/'+id, data, { headers })
}
export const removeProductInCart = (id:string, userId: string) => {
  return instance.post('cart/' + id, {userId}, { headers });
}

