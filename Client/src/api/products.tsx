import { instance } from "./config"
export const getBrand=()=>{
    return instance.get('brand')
}

export const getAll=()=>{
    return instance.get('product')
}
export const getProduct=(id:string)=>{
    return instance.get('product/'+id)
}
export const updateProduct=(id:string, data:any)=>{
    return instance.patch('product/'+id,data)
}
export const createProduct=( data:any)=>{
    return instance.post('product/',data)
}
// export const getProductOutstanding=(id:string)=>{
//     return instance.get('productOutstanding/'+id)
// }
export const getProductNew=()=>{
    return instance.get('product/?_sort=createdAt&_order=desc&_limit=20')
}
export const sortProduct=(value:any)=>{
    return instance.get('product/?_sort=price&_order='+value)
}
export const searchProduct=(value:any)=>{
    return instance.get('product/?_q='+value)
}
export const paginateProduct=(value:any)=>{
    return instance.get('product/?_limit=12&_page='+value)
}
export const filterPrice=(min:number ,max:number)=>{
    const value={
        minPrice:min,
        maxPrice:max
    }
    return instance.post('productFilter/',value)
}
export const getCategoryProducts=(idCate:string)=>{
    return instance.get('subCategoryProducts/'+idCate)

}
export const paginateCategoryProducts=(idCate:string,page:number)=>{
    return instance.get(`subCategoryProducts/${idCate}?_limit=12&_page=`+page)

}

export const getColors=()=>{
    return instance.get('colors')

}


