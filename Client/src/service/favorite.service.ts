import { instance } from "./config.service"
const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
const headers: Record<string, string> = {};  //Record<keyType, valueType>.
if (accessToken) {
  headers["Authorization"] = `Bearer ${accessToken}`;
}
export const updateFavorite = (productId: string) => {
    return instance.post('favorite', {productId}, { headers })
}

export const getFavorite = (id: string) => {
    return instance.get('favorite/' + id)
}
export const getFavoriteUser = () => {
    return instance.get('favorite-user/' , { headers })
}