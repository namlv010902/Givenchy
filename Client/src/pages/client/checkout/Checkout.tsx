
import { useEffect } from 'react'
import { useStoreCart } from '../../../store/hooks'
import './checkout.css'
import { getCart } from '../../../service/cart.service'
import { useForm } from "react-hook-form";
import { createOrder } from '../../../service/order.service';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Checkout = () => {
  const userId = JSON.parse(localStorage.getItem('userId')!)
  const { cart, dispatch } = useStoreCart()
  const navigate = useNavigate()
  useEffect(() => {
    if (cart?.products?.length == 0) {
      navigate("/")
    }
    if (!userId) {
      navigate('auth/login')
    }
  }, [cart, userId])
  useEffect(() => {
    const fetchCart = async () => {
      const { data } = await getCart(userId)
      dispatch({
        type: 'GET_CART',
        payload: data.cart
      })
    }
    fetchCart()
  }, [])
  console.log(cart);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data: any) => {
    data["cartId"] = cart._id
    data["userId"] = userId
    Swal.fire({
      title: 'Are you sure order?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oki'
    }).then((result) => {
      if (result.isConfirmed) {
        createOrder(data).then(() => {
          dispatch({
            type: 'DELETE_ALL_PRODUCTS_IN_CART'
          })
          navigate('/message')
        })
          .catch((error) => alert(error))
      }
    })

  };
  return (
    <div className='checkout-main'>
      <div className="checkout">
        <h3>Checkout</h3>
        <form className="formCheckout" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="">CustomerName</label> <br />
            <input type="text" {...register("customerName", { required: true })} /> <br />
            {errors.customerName?.type === 'required' && <span style={{ color: "#f12" }}>This is required</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label> <br />
            <input type="text" {...register("phone", { required: true, pattern: /^0[0-9]{9}$/ })} /> <br />
            {errors.phone?.type === 'required' && <span style={{ color: "#f12" }}>This is required</span>}
            {errors.phone?.type === 'pattern' && <span style={{ color: "#f12" }}>Place enter valid phone number</span>}
            <div className="form-group">
              <label htmlFor="">Address</label> <br />
              <input type="text" {...register("address", { required: true })} /> <br />
              {errors.address?.type === 'required' && <span style={{ color: "#f12" }}>This is required</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Note</label> <br />
            <textarea  {...register("note")} />
          </div>
          <input type="radio" name="" id="" style={{ marginTop: "10px" }} checked /> Payment on delivery
          <div className="form-group">
            <button>Place order</button>
          </div>

        </form>
      </div>
      <div className="cart">
        <h4>Perfume selected</h4>
        {cart?.products?.map((product: any) => {
          const sum = product.price * product.quantity
          return (
            <div className="cartItem">
              <div className="c_productInCart">
                <div className="cart_product_image">
                  <img src={product.productId.image} alt="" />
                  <p >{product.quantity}</p>
                </div>
                <div className="cart_product">
                  <p>{product.productId.name} ( {product.sizeId.name} )</p>

                </div>
              </div>
              <div className="cart_product_totalPrice">
                <p style={{ color: "#f12" }}>${sum}</p>

              </div>
            </div>
          )
        }

        )}
        <h3 id='cartTotalPrice'>TotalPrice: ${cart.totalPrice}</h3>
      </div>
    </div>
  )
}

export default Checkout