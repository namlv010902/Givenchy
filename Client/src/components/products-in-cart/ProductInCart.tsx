import { Link } from 'react-router-dom';
import { getCart, removeProductInCart } from '../../service/cart.service';
import { useStoreCart } from '../../store/hooks';
import {useEffect} from "react"
import { Popover } from 'antd';
import { scrollToTop } from '../../service/config.service';
const ProductInCart = () => {
    const { cart, dispatch } = useStoreCart()
  let countProductInCart = cart?.products?.length || 0
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
  const showCart = (
    <div className='show-cart'>
      {cart?.products?.length > 0 ? <div>
        {cart?.products?.map((item: any) => (
          <div key={item._id}>
            <div className="productInCart" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginRight: "10px" }}>
              <div className="item-cart">
                <div className="product-in-cart-image">
                  <img src={item.productId.image} alt="" />
                </div>
                <div className="product-in-cart">
                  <p>{item.productId.name}</p>
                  <strong id='price'>${item.price} </strong>
                  <p>( {item.sizeId.name} x {item.quantity} )</p>
                </div>
              </div>
              <i style={{ cursor: "pointer" }} onClick={() => handleRemove(item._id)}
                className="fa-regular fa-circle-xmark"></i>
            </div>
          </div>
        ))}
        <strong id='priceTotal'>TotalPrice: ${cart?.totalPrice}</strong> <br />
        <Link onClick={()=>scrollToTop()} to="/cart"> <button className="btn-show-cart" >View cart</button></Link>
      </div> : <p style={{ textAlign: "center" }}> <i className="fa-regular fa-circle-exclamation"></i>Cart empty </p>
      }
    </div>
  )
  return (
    <div>
   <Popover content={showCart} placement="bottom" >
            <Link to="/cart" onClick={()=>scrollToTop()} id='dropCart'>  <i title='Giỏ hàng của bạn' className='fa fa-shopping-basket'></i> <p>{countProductInCart}</p> </Link></Popover>

    </div>
  )
}

export default ProductInCart