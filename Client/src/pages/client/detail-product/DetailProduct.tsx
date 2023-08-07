import { Button, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProduct } from '../../../api/products';
import ShowComment from '../../../components/comment/Comment';
import { IProduct } from '../../../types/products';
import './DetailProduct.css';
import Products from '../../../components/products/Products';
import { addToCart } from '../../../api/cart';

interface IProps {
  handleAddToCart(data: any): void
  handleCreateComment(data: any): void
  comment: any,

}
const DetailProduct = (props: IProps) => {
  const [show, setShow] = React.useState(false)
  const [product, setProduct] = useState<IProduct>()
  const [relatedProducts, setRelatedProducts] = useState([])
  const [checkFavorites, setCheckFavorites] = useState(false)
  const [countFavorites, setCountFavorites] = useState(0)
  const [quantity, setQuantity] = useState(1)
  console.log(product);
  const { id } = useParams()
  const userId = JSON.parse(localStorage.getItem("userId")!);
  useEffect(() => {
    getProduct(id).then(({ data }) => {
      setProduct(data.product)
      setRelatedProducts(data.relatedProducts)
      console.log(product);
    }
    )
  }, [id])
  const [price, setPrice] = useState(5)
  const [inStock, setInStock] = useState()
  const [sizeId, setSizeId] = useState()

  useEffect(() => {
    setPrice(product?.sizes[0]?.price)
    setInStock(product?.sizes[0]?.inStock)
  }, [product])

  const dataComment = {
    userId: userId,
    productId: product?._id
  }
  const ShowDesc = () => {
    console.log("SHOW");
    return (
      <div>
        <p>{product?.description}</p>
      </div>
    )
  }
  const handleAddCart = () => {
    if (!sizeId) {
      toast.error("Please select a size")
      return
    }
    if(!userId){
      toast.error("Log in to add shopping cart")
    }
    const data = {
      productId: id,
      price,
      quantity,
      sizeId,
      userId
    }
    console.log(data);
    addToCart(data).then(()=>{
      toast.success("Added to cart")
    })
  }
  const updateQuantity = (value: any) => {
    console.log(value);
    if (value == "increase") {
      setQuantity(quantity + 1)
    } else {
      setQuantity(quantity - 1)
      if (quantity == 1) {
        setQuantity(1)
      }
    }
  }
  const resetDetail = (id: string) => {
    const info = product?.sizes?.find((item: any) => item.sizeId._id == id)
    setSizeId(id)
    setPrice(info.price)
    setInStock(info.inStock)
  }
  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className="banner-detail">
      </div>
      <div className="detail-main">
        <div className="detailProduct">
          <div className="detailProduct-image">
            <Image id='main-img' src={product?.image} alt="" />
            <div className="heart-share">
              <p id="share">Chia sẻ:
                <img src="https://res.cloudinary.com/dgqvtbr4n/image/upload/v1688562185/fb-removebg-preview_s627uf.png" alt="" />
              </p>
              {checkFavorites ?
                <div className="heart">
                  Đã thích <i style={{ color: "red" }} className="fa fa-heart" aria-hidden="true"></i>({countFavorites})
                </div>
                :
                <div className="heart">
                  Đã thích <i className="fa fa-heart-o" aria-hidden="true"></i>({countFavorites})
                </div>
              }
            </div>
          </div>
          <div className="detailInfo">
            <h1 >{product?.name}</h1>
            <hr />
            <p>Brand: <span>{product?.brandId?.name}</span></p>
            <h3 id='priceDetail' >${price}</h3>
            <p>Description: <br />
              <span>{product?.description}</span>
            </p>
            <p>Size:
              {product?.sizes?.map((item: any, index: number) => (
                <Button key={index} onClick={() => resetDetail(item?.sizeId._id)}>{item?.sizeId?.name}</Button>
              ))}</p>
            <p>InStock:
              <span>{inStock}</span>
            </p>

            <p id='quantity' >Quantity:  <form action="" id='form-add-cart'>
              <p onClick={() => updateQuantity("decrease")}>-</p><input type="number" min={1} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} /> <p onClick={() => updateQuantity("increase")} >+</p>
            </form> </p>
            <button onClick={() => handleAddCart()} className='addCart'><i className="fa fa-cart-plus" aria-hidden="true"></i>ADD TO CART</button>



          </div>

        </div>
        <div className="desc" >
          <button className='btn-primary' onClick={() => setShow(false)}>Description</button>
          <button className='btn-primary' onClick={() => setShow(true)}>Comment</button>
          <div className="showDescOrComment" >
            {show ? <ShowComment data={dataComment} idProduct={id} handleCreateComment={props.handleCreateComment} /> : <ShowDesc />}
          </div>
        </div>

        <div className="title" >
          <div className="title-child"><h1>Related products</h1></div>

        </div>
        <div className="products">
          {relatedProducts?.map((item: any, index: number) => (
            <Products product={item} key={index}></Products>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetailProduct