import { Link } from "react-router-dom"
import { IProduct, IResSize } from "../../common/products"
import { scrollToTop } from "../../service/config.service"
import { useState } from "react"
import { addToCart, getCart } from "../../service/cart.service"
import { useStoreCart } from "../../store/hooks"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {  Modal,message } from 'antd';
interface IProps {
  product: IProduct,
}
const Products = (props: IProps) => {
  const [sizeId, setSizeId] = useState("")
  const [price, setPrice] = useState(props.product.sizes[0].price)
  const userId = JSON.parse(localStorage.getItem("userId")!)
  const { dispatch } = useStoreCart()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleAddToCart = (productId: string) => {

    const data = {
      userId,
      sizeId,
      productId,
      price,
      quantity: 1
    }
    if (!sizeId) {
      messageApi.open({
        type: 'error',
        content: 'Please provide a size (ml)',
      });
      return
    }
    addToCart(data).then(() => {
      getCart(userId).then(({ data }) => {
        dispatch({
          type: "GET_CART",
          payload: data.cart
        });
        toast.success("Added to cart")
      })
    })
      .catch(({ response }) => {
        toast.error(response.data.message);
      })
    console.log(data);
  }
  const handleSize = (id: string) => {
    console.log(id);
    setSizeId(id);
    const productExist = props.product.sizes.find((item: IResSize) => item.sizeId._id == id)
    console.log(productExist);
    if (productExist && productExist.price) {
      const price = productExist.price;
      setPrice(price)
    }
   

  }
  return (
    <div className="colum" key={props.product._id}><ToastContainer></ToastContainer>
      <div className="image">{contextHolder}
        <img src={props.product.image} alt="" />
        <i id='heart' className="fa fa-heart-o" aria-hidden="true"></i>
        <div className="icon">
       <i title="Quick view" onClick={() => showModal()} className="fa fa-eye" aria-hidden="true"></i>
          <i onClick={() => handleAddToCart(props.product._id)} className="fa fa-cart-plus" aria-hidden="true"></i>
        </div>
      </div>
      <div className="content">
        <p><Link onClick={()=>scrollToTop()} to={`/product/${props.product._id}`}>{props.product.name}</Link> </p>
        <strong>${price}</strong> <br />
        {props.product.sizes.map((item: any) => (
          <button onClick={() => handleSize(item.sizeId._id)} className={sizeId == item.sizeId._id ? "btn-sizeFocus" : "btn-size"} style={{ margin: "10px 2px" }}>{item.sizeId.name}</button>
        ))}

      </div>
      <Modal title={props.product.name}open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div style={{display:"flex",margin:"15px 0"}}>
      <div className="modal-left">
        <p>
          <img height={120} src={props.product.image} alt="" />
        </p>  
      </div>
      <div className="modal-right" style={{marginLeft:"50px"}}>
      <p style={{color:"#f12",fontWeight:"bold"}}>${props.product.sizes[0].price} </p>
      <p>Category: {props.product.categoryId.name}</p>
      <p>Brand: {props.product.brandId.name}</p>
      <p>Capacity: {props.product.sizes.map((item)=>(
        <> {item.sizeId.name}, </>
      ))}</p>
      </div>
      </div>
      <p>{props.product.description}</p>
      </Modal>
    </div>
  )
}

export default Products