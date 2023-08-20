import { Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategoryProducts, getProduct } from '../../../service/products.service';
import ShowComment from '../../../components/comment/Comment';
import { IProduct } from '../../../types/products';
import './DetailProduct.css';
import Products from '../../../components/products/Products';
import { useCart } from '../../../hooks/useCart';
import useFavorite from '../../../hooks/useFavorite';
import { IFavorite } from '../../../types/favorite';
const DetailProduct = () => {
  const [show, setShow] = React.useState(false)
  const [product, setProduct] = useState<IProduct>()
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(0)
  const [inStock, setInStock] = useState(0)
  const [unitsSold, setUnitsSold] = useState(0)
  const [sizeId, setSizeId] = useState("")
  const { id } = useParams()
  const { handleAddCart } = useCart()
  const { addOrRemoveFavorite,favorites } = useFavorite()
  const productFvExist = favorites.find((item:IFavorite)=>item.productId._id === product?._id)
  console.log(productFvExist);
  
  useEffect(() => {
    if (id) {
      getProduct(id).then(({ data }) => {
        setProduct(data.product)
        setIsLoading(false)
      }
      )
        .catch(() => {
          setIsLoading(false)
        })
    }
  }, [id])
  const categoryId = product?.categoryId._id
  useEffect(() => {
    if (categoryId) {
      getCategoryProducts(categoryId).then(({ data }) => setRelatedProducts(data.products.docs))
    }
  }, [categoryId])
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
    productId: product?._id
  }
  const ShowDesc = () => {
    return (
      <div>
        <p>{product?.description}</p>
      </div>
    )
  }
  // update lại số lượng khi click nút - +
  const updateQuantity = (value: any) => {
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
  // reset lại giá, số lượng tồn kho, số lượng đã bán khi chọn size
  const resetDetail = (id: string) => {
    const info = product?.sizes?.find((item: any) => item.sizeId._id == id)
    setSizeId(id)
    if (info) {
      setPrice(info.price)
      setInStock(info.inStock)
      setUnitsSold(info.unitsSold)
    }
  }
  // update số lượng khi onChannge
  const handleChangeQuantity = async (quantity: any) => {
    if (inStock) {
      if (quantity >= inStock) {
        setQuantity(inStock)
        return
      }
    }
    setQuantity(parseInt(quantity))
  }
  // add to cart
  const onAddCart = () => {
    handleAddCart({
      product,
      productId: id,
      quantity,
      price,
      sizeId,
      inStock
    })
  }
  //Thêm or xóa sản phẩm vào yêu thích
  // => backend đã check sp yêu thích theo idUser từ request lúc đăng nhập vào
  const handleFavorite = () => {
    id && addOrRemoveFavorite(id)
  }

  return (
    <div style={{ minHeight: "80vh" }}>
      <ToastContainer></ToastContainer>
      {isLoading ? <div style={{ textAlign: "center" }}><img src="https://media1.giphy.com/media/kUTME7ABmhYg5J3psM/giphy.gif?cid=ecf05e47m4ti25gg5zz2if8kxnefsg9lo7nx4cuf5fprvtsa&ep=v1_gifs_search&rid=giphy.gif&ct=g" /> </div> :
        <div>
          {product ?
            <div className="detail-main">
              <div className="detailProduct">
                <div className="detailProduct-image" style={{ position: "relative" }}>
                  <Image id='main-img' src={product?.image} alt="" />
                  {inStock == 0 && <img style={{ width: "150px", position: "absolute", top: "0", left: "0" }} src="https://www.pngkey.com/png/full/118-1182729_out-of-stock-contemporary-human-resource-management-by.png" alt="" />}
                  <div className="heart-share">
                    <p id="share">Share:
                      <img src="https://res.cloudinary.com/dgqvtbr4n/image/upload/v1688562185/fb-removebg-preview_s627uf.png" alt="" />
                    </p>
                    <div className="heart">
                      Like {productFvExist ? <i style={{color:"#f12"}} onClick={() => handleFavorite()} className="fa fa-heart" aria-hidden="true"></i> : <i onClick={() => handleFavorite()} className="fa fa-heart-o" aria-hidden="true"></i> }
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
                  <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "150px" }}>
                    <p>InStock
                      <span> {inStock}</span>
                    </p>
                    <p >UnitsSold
                      <span> {unitsSold}</span>
                    </p>
                  </div>
                  <p id='quantity' >Quantity  <div id='form-add-cart'>
                    <p onClick={() => updateQuantity("decrease")}>-</p><input type="number" min={1} max={inStock} value={quantity} onChange={(e) => handleChangeQuantity(e.target.value)} /> <p onClick={() => updateQuantity("increase")} >+</p>
                  </div> </p>
                  <button disabled={inStock == 0} onClick={() => onAddCart()} className={inStock > 0 ? 'addCart' : 'cartDisabled'}><i className="fa fa-cart-plus" aria-hidden="true"></i>ADD TO CART</button>
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
            : <div className='exist' style={{ marginTop: "100px" }} >
              <img src="https://i.pinimg.com/564x/7c/f6/24/7cf6247aa5499759fded5f256ab65a53.jpg" alt="" />
              <h2 >Product does not exist</h2>
            </div>
          }
        </div>}
    </div>
  )
}

export default DetailProduct