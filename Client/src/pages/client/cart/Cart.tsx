import { InputNumber, Form, Radio } from 'antd'
import './cart.css'
import { Link, useNavigate } from 'react-router-dom'
import { ICart } from '../../../types/cart'
import { Button, Checkbox, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import {useEffect} from "react"
import { scrollToTop } from '../../../api/config';
interface IProps {
  cart: ICart
  updateCart(data: any): void
  removeOneProductInCart(productId: string,colorId:string): void
  handleCreateOrder(data: any): void
}
const Cart = (props: IProps) => {
  const navigate = useNavigate()
  const idUser = JSON.parse(localStorage.getItem('userId')!);
  console.log(idUser);
  useEffect(()=>{
  if(!idUser){
    navigate("/auth/login")
  }
  },[])
  console.log(props?.cart?.products);
  const cartId = props.cart?._id
  const userId = JSON.parse(localStorage.getItem('userId')!);
  const onUpdateCart = (value: number, productId: string,colorId:string) => {
    console.log(value, idUser, productId);
    const data = {
      quantity: value,
      userId: idUser,
      productId: productId,
      colorId

    }
    console.log(data);
    
    if (value == 0 || !value) {
      if (window.confirm("Xóa sản phẩm khỏi giỏ hàng")) {
        props.removeOneProductInCart(productId,colorId)
        alert("Đã xóa sản phẩm khỏi giỏ hàng")  }
    } else {
       props.updateCart(data)
    }
  }
  const removeInCart = (productId: string,sizeId:string) => {

    props.removeOneProductInCart(  productId,sizeId);
  }
  
  return (
    <div>
      <ToastContainer></ToastContainer>

      <div className="order-main">
        
        {props.cart?.products?.length>0 ?
          <div id="show-cart">

            <table id='cart'>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sum</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {props.cart.products?.map((item: any) => {



                  let sum = item.price * item.quantity


                  return (
                    <tr key={item._id}>
                      <td>{item.productId.name}({item.sizeId.name})</td>
                      <td><Link to={`/product/${item.productId._id}`} ><img src={item.productId.image} alt="" /></Link></td>
                      <td style={{ color: "#fca120" }}> ${item.price}</td>
                      <td>

                        <InputNumber min={1} defaultValue={item.quantity} onChange={(e) => onUpdateCart(e, item.productId._id,item?.colorId)} />

                      </td>
                      <td>${sum}</td>
                      <td><button className='btn-removeCart' onClick={() => removeInCart(item.productId._id, item.sizeId)} ><i className="fa-regular fa-circle-xmark"></i></button></td>
                    </tr>
                  )
                })}


              </tbody>


            </table>
            <div className="OrderForm" >
              
            </div>

          </div>
          : <div className='cart-err'>
            <img src="https://bizweb.dktcdn.net/100/331/465/themes/684469/assets/empty-bags.jpg?1541753997372" alt="" />

            <Link to="/products"> <Button onClick={()=>scrollToTop()}>Tiếp tục lựa chọn</Button></Link></div>

        }

      </div>
    </div>
  )
}

export default Cart