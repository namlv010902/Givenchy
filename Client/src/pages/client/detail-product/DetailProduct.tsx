import { Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategoryProducts, getProduct } from '../../../service/products.service';
import ShowComment from '../../../components/comment/Comment';
import { IProduct } from '../../../common/products';
import './DetailProduct.css';
import Products from '../../../components/products/Products';
import { addToCart, getCart } from '../../../service/cart.service';
import { useStoreCart } from '../../../store/hooks';

const DetailProduct = () => {
  const [show, setShow] = React.useState(false)
  const [product, setProduct] = useState<IProduct>()
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  let [quantity, setQuantity] = useState(1)
  const [errSize, setErrSize] = useState(false)
  const [price, setPrice] = useState(5)
  const [inStock, setInStock] = useState(0)
  const [unitsSold , setUnitsSold ] = useState(0)
  const [sizeId, setSizeId] = useState("")
  const { dispatch } = useStoreCart()
  console.log(relatedProducts);
  const { id } = useParams()
  const userId = JSON.parse(localStorage.getItem("userId")!);
  useEffect(() => {
    if (id) {
      getProduct(id).then(({ data }) => {
        setProduct(data.product)
        setIsLoading(false)
      }
      )
    }
  }, [id])
  const categoryId = product?.categoryId._id
  useEffect(()=>{
     if(categoryId){
       getCategoryProducts(categoryId).then(({data})=>setRelatedProducts(data.products.docs))
     }
  },[categoryId])
 
  
  useEffect(() => {
    if (product && product.sizes && product.sizes[0]?.price) {
      setPrice(product.sizes[0].price);
    }
    if (product && product.sizes && product.sizes[0]?.inStock) {
      setInStock(product.sizes[0].inStock);
      setUnitsSold(product.sizes[0].unitsSold);
    }
  }, [product]);
  const dataComment = {
    userId: userId,
    productId: product?._id
  }
  const ShowDesc = () => {
    return (
      <div>
        <p>{product?.description}</p>
      </div>
    )
  }
  const handleAddCart = () => {
    if (sizeId) {
      setErrSize(false)
      const data = {
        productId: id,
        price,
        quantity,
        sizeId,
        userId
      }
      // console.log(data);
      addToCart(data).then(() => {
        const updateData = async () => {
          const { data: updatedCartData } = await getCart(userId);
          dispatch({
            type: "GET_CART",
            payload: updatedCartData.cart
          });
        }
        updateData()
        toast.success("Added to cart")
      })
        .catch(({ response }) => {
          toast.error(response.data.message);
        })
    } else {
      setErrSize(true)
    }
  }
  const updateQuantity = (value: any) => {
    console.log(value);
    if (value == "increase") {
      if (inStock) {
        if (quantity >= inStock) {
          setQuantity(inStock)
          return
        }
      }
      setQuantity(quantity + 1)
    } else {
      setQuantity(quantity - 1)
      if (quantity == 1) {
        setQuantity(1)
      }
    }
  }
  const resetDetail = (id: string) => {
    setErrSize(false)
    const info = product?.sizes?.find((item: any) => item.sizeId._id == id)
    setSizeId(id)
    if(info){
      setPrice(info.price)
     setInStock(info.inStock)
     setUnitsSold(info.unitsSold)
    }
  }
  const handleChangeQuantity = (quantity: any) => {
    if (quantity == 0 || quantity.length == 0) {
      quantity = 1
    }
    if (inStock) {
      if (quantity >= inStock) {
        setQuantity(inStock)
        return
      }
    }
    setQuantity(parseInt(quantity))
  }
  return (
    <div style={{ minHeight: "80vh" }}>
      <ToastContainer></ToastContainer>
      {isLoading ? <div style={{ textAlign: "center" }}><img src="https://media1.giphy.com/media/kUTME7ABmhYg5J3psM/giphy.gif?cid=ecf05e47m4ti25gg5zz2if8kxnefsg9lo7nx4cuf5fprvtsa&ep=v1_gifs_search&rid=giphy.gif&ct=g" /> </div> :
        <div>
          {product ?
            <div className="detail-main">
              <div className="detailProduct">
                <div className="detailProduct-image">
                  <Image id='main-img' src={product?.image} alt="" />
                  <div className="heart-share">
                    <p id="share">Share:
                      <img src="https://res.cloudinary.com/dgqvtbr4n/image/upload/v1688562185/fb-removebg-preview_s627uf.png" alt="" />
                    </p>
                    <div className="heart">
                      Đã thích <i className="fa fa-heart-o" aria-hidden="true"></i>(0)
                    </div>
                  </div>
                </div>
                <div className="detailInfo">
                  <h1 >{product?.name}</h1>
                  <hr />

                  <h3 id='priceDetail' >${price}</h3>
                  <p>Category <span>{product?.categoryId?.name}</span></p>
                  <p>Brand <span>{product?.brandId?.name}</span></p>
                  <p>Description <br />
                    <span>{product?.description}</span>
                  </p>
                  <p>Capacity
                    {product?.sizes?.map((item: any, index: number) => (
                      <button className={sizeId == item.sizeId._id ? "btn-sizeFocus" : "btn-size"} key={index} onClick={() => resetDetail(item?.sizeId._id)}>{item?.sizeId?.name}</button>
                    ))}</p>
                  {errSize && <span style={{ color: "#f12" }}>Please choose a size(ml) </span>}
                 <div style={{display:"flex",justifyContent:"space-between",paddingRight:"150px"}}>
                 <p>InStock
                    <span> {inStock}</span>
                  </p>
                  <p >UnitsSold
                  <span> {unitsSold }</span>
                  </p>
                 </div>
                  <p id='quantity' >Quantity  <form action="" id='form-add-cart'>
                    <p onClick={() => updateQuantity("decrease")}>-</p><input type="number" min={1} max={inStock} value={quantity} onChange={(e) => handleChangeQuantity(e.target.value)} /> <p onClick={() => updateQuantity("increase")} >+</p>
                  </form> </p>
                  <button onClick={() => handleAddCart()} className='addCart'><i className="fa fa-cart-plus" aria-hidden="true"></i>ADD TO CART</button>
                </div>
              </div>
              <div className="desc" >
                <button className='btn-primary' onClick={() => setShow(false)}>Description</button>
                <button className='btn-primary' onClick={() => setShow(true)}>Comment</button>
                <div className="showDescOrComment" >
                {show ? <ShowComment data={dataComment} idProduct={id || ''} /> : <ShowDesc />}
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
            : <div className='exist' >
              <img src="https://i.pinimg.com/564x/7c/f6/24/7cf6247aa5499759fded5f256ab65a53.jpg" alt="" />
              <h2 >Product does not exist</h2>
            </div>
          }
        </div>}
    </div>
  )
}

export default DetailProduct