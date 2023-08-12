import { instance } from "./config.service"

export const createFavorite = (data: any) => {
    return instance.post('favorite', data)
}
export const removeFavorite = (data: any) => {
    return instance.post('favorite-remove', data)
}
export const checkFavorite = (data: any) => {
    return instance.post('favorite-check', data)
}
export const getFavorite = (id: string) => {
    return instance.get('favorite/' + id)
}
export const getFavoriteUser = (id: string) => {
    return instance.get('favorite-user/' + id)
}