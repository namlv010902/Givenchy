import { getCart, removeProductInCart } from "../service/cart.service"
import { useStoreCart } from "../store/hooks"
import {useEffect} from "react"
export const useCart =()=>{
  const { cart, dispatch } = useStoreCart()
 
 const accessToken = JSON.parse(localStorage.getItem("accessToken")!)
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getCart()
        dispatch({
          type: "GET_CART",
          payload: data.cart
        })
      } catch (error) {
        console.log('Error fetching cart:', error);
      }
    }
      if(accessToken){
        getData()
      }
  }, [])
  const handleRemove = (id: string) => {
    removeProductInCart(id);
    dispatch({
      type: "DELETE_PRODUCT_IN_CART",
      payload: id
    });

  }
  return {cart, handleRemove,dispatch}
}