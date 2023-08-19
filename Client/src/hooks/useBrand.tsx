import { getBrands } from "../service/brand.service"
import { IBrand } from "../types/brand"
import {useEffect, useState} from "react"
export const useBrand =()=>{
    const [brand, setBrand] = useState<IBrand[]>()
    useEffect(() => {
      getBrands().then(({ data }) => setBrand(data.brand)
      )
    }, [])
    return {brand}
}