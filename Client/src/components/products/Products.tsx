import { Link } from "react-router-dom"
import { IProduct, IResSize } from "../../types/products"
import { scrollToTop } from "../../service/config.service"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'antd';
import { useCart } from "../../hooks/useCart"
interface IProps {
  product: IProduct,
}
const Products = (props: IProps) => {
  const [sizeId, setSizeId] = useState("")
  const [inStock, setInStock] = useState(1)
  const [price, setPrice] = useState(props.product.sizes[0].price)
  const { handleAddCart } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleAddToCart = () => {
    const data = {
      product: props.product,
      productId: props.product._id,
      quantity: 1,
      price,
      sizeId,
      inStock,
    }
    handleAddCart(data)

  }
  const handleSize = (id: string) => {
    console.log(id);
    setSizeId(id);
    const productExist = props.product.sizes.find((item: IResSize) => item.sizeId._id == id)
    if (productExist) {
      setInStock(productExist?.inStock);
      setPrice(productExist?.price)
    }
  }
  
  
  return ( 

    <div className="colum" key={props.product._id}><ToastContainer></ToastContainer>
      <div className="image">
        <img id="productImage" src={props.product.image} alt="" />
        {inStock == 0 && <img style={{ width: "80px", position: "absolute", top: "0", left: "0" }} src="https://www.pngkey.com/png/full/118-1182729_out-of-stock-contemporary-human-resource-management-by.png" alt="" />}
        <i id='heart' className="fa fa-heart-o" aria-hidden="true"></i>
        <div className="icon">
          <i title="Quick view" onClick={() => showModal()} className="fa fa-eye" aria-hidden="true"></i>
          {/* Check xem còn hàng ko  */}
          {inStock > 0 ?
            <i onClick={() => handleAddToCart()} className="fa fa-cart-plus" aria-hidden="true"></i>
            : <i style={{ background: "#ccc", cursor: "not-allowed" }} className="fa fa-cart-plus" aria-hidden="true"></i>
          }
        </div>
      </div>
      <div className="content">
        <p><Link onClick={() => scrollToTop()} to={`/product/${props.product._id}`}>{props.product.name}</Link> </p>
        <strong>${price}</strong> <br />
        {props.product.sizes.map((item: any) => (
          <button onClick={() => handleSize(item.sizeId._id)} className={sizeId == item.sizeId._id ? "btn-sizeFocus" : "btn-size"} style={{ margin: "10px 2px" }}>{item.sizeId.name}</button>
        ))}
      </div>
      <Modal title={props.product.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <div className="modal-left">
            <p>
              <img height={120} src={props.product.image} alt="" />
            </p>
          </div>
          <div className="modal-right" style={{ marginLeft: "50px" }}>
            <p style={{ color: "#f12", fontWeight: "bold" }}>${props.product.sizes[0].price} </p>
            <p>Category: {props.product.categoryId.name}</p>
            <p>Brand: {props.product.brandId.name}</p>
            <p>Capacity: {props.product.sizes.map((item) => (
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