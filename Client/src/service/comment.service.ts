import { instance } from "./config.service"
const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
const headers: Record<string, string> = {};  //Record<keyType, valueType>.
if (accessToken) {
  headers["Authorization"] = `Bearer ${accessToken}`;
}
export const createComment = (data: any) => {
    return instance.post("comment", data,{headers})
}
export const getCommentProduct = (idProduct: string) => {
    return instance.get("comment/" + idProduct)
}