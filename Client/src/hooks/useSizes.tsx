import { useEffect } from "react"
import { useStoreSize } from "../store/hooks"
import { getSizes } from "../service/size.service"

export const useSizes=()=>{
    const { sizes, dispatch } = useStoreSize()
    useEffect(() => {
     getSizes().then(({data})=>{
      dispatch({
        type:'GET_SIZES',
        payload:data.size
      })
     })
    }, [])
    return { sizes }
}