import { instance } from "./config.service"

export const getAll = () => {
    return instance.get('product')
}
export const getProduct = (id: string) => {
    return instance.get('product/' + id)
}
export const updateProduct = (id: string, data: any) => {
    return instance.patch('product/' + id, data)
}
export const createProduct = (data: any) => {
    return instance.post('product/', data)
}

export const getProductNew = () => {
    return instance.get('product/?_sort=createdAt&_order=desc&_limit=10')
}
export const getProductBest = () => {
    return instance.get('product/?_sort=createdAt&_order=asc&_limit=5')
}
export const sortProduct = (value: any) => {
    return instance.get('product/?_sort=name&_order=' + value)
}
export const searchProduct = (value: any) => {
    return instance.get('product/?_q=' + value)
}
export const paginateProduct = (value: any) => {
    return instance.get('product/?_limit=12&_page=' + value)
}
export const filterPrice = (min: number, max: number) => {
    const value = {
        minPrice: min,
        maxPrice: max
    }
    return instance.post('productFilterPrice/', value)
}
export const getCategoryProducts = (idCate: string) => {
    return instance.get('categoryProducts/' + idCate)
}
export const getProductsByGender = (gender: string) => {
    return instance.get('productsByGender/' + gender)
}
export const getProductsBySize = (id: string) => {
    return instance.get('size/' + id)
}
export const getProductsByBrand = (id: string) => {
    return instance.get('brand/' + id)
}
export const paginateCategoryProducts = (idCate: string, page: number) => {
    return instance.get(`categoryProducts/${idCate}?_limit=12&_page=` + page)

}




