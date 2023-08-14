import { instance } from "./config.service"

export const getBrands = () => {
    return instance.get('brand')
}
export const getProductsByBrand=(id:string)=>{
    return instance.get("brand/"+id)
}