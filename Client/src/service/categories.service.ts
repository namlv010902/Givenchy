
import { instance } from "./config.service"

export const getCategories = () => {
    return instance.get('categories')
}

export const getCategory = (id: string) => {
    return instance.get('categories/' + id)
}


