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
import { addToCart, getCart } from '../../../service/cart.service';
import { useStoreCart } from '../../../store/hooks';
import { message } from 'antd';
import { updateFavorite } from '../../../service/favorite.service';

const DetailProduct = () => {
  const [show, setShow] = React.useState(false)
  const [product, setProduct] = useState<IProduct>()
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [errSize, setErrSize] = useState(false)
  const [price, setPrice] = useState(0)
  const [inStock, setInStock] = useState(0)
  const [unitsSold, setUnitsSold] = useState(0)
  const [sizeId, setSizeId] = useState("")
  const [messageApi, contextHolder] = message.useMessage();
  const { cart, dispatch } = useStoreCart()
  // console.log(relatedProducts);
  const { id } = useParams()
  const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
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
  const handleAddCart = () => {
    if (!accessToken) {
      messageApi.open({
        type: 'error',
        content: 'Please log in!',
      });
      return
    }
    //kiểm tra trường hợp nếu trong giỏ của user đã tồn tại sản phẩm đó tiếp tục thêm vượt quá tồn kho
    getCart().then(({ data }) => {
      dispatch({
        type: "GET_CART",
        payload: data.cart
      });
    })
    if (cart?.products) {
      const productExist = cart.products.find((item: any) => item.productId._id == product?._id && item.sizeId._id == sizeId)
      if (productExist) {
        if (quantity > (inStock - productExist.quantity)) {
          messageApi.open({
            type: 'error',
            content: 'Maximum quantity reached. You cannot add more items to your cart!',
          });
          return
        }
      }
    }

    // check trường hợp người dùng cố tình xóa số lượng hoặ để số lượng về 0 rồi add cart
    if (!quantity || quantity == 0) {
      messageApi.open({
        type: 'error',
        content: 'Please check the quantity !',
      });
      return
    }
    // nếu đã chọn size thì mới cho add cart
    if (sizeId) {
      setErrSize(false)
      const data = {
        productId: id,
        price,
        quantity,
        sizeId,

      }
      // console.log(data);
      addToCart(data).then(() => {
        getCart().then(({ data }) => {
          dispatch({
            type: "GET_CART",
            payload: data.cart
          });
        });
        messageApi.open({
          type: 'success',
          content: 'Add to Cart successfully',
        });
      })
        .catch(({ response }) => {
          alert(response.data.message);
        })
    } else {
      setErrSize(true)
    }
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
    setErrSize(false)
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
  //Thêm sản phẩm vào yêu thích
  const addFavorite = () => {
    if (!accessToken) {
      messageApi.open({
        type: 'error',
        content: 'Please log in!',
      });
      return
    }
    try {
      if (product) {
        updateFavorite(product._id).then(({ data }) => {
          messageApi.open({
            type: 'success',
            content: data.message,
          });
        })

      }
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div style={{ minHeight: "80vh" }}>
      <ToastContainer></ToastContainer>{contextHolder}
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
                      Like <i onClick={() => addFavorite()} className="fa fa-heart-o" aria-hidden="true"></i>
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
                  <button disabled={inStock == 0} onClick={() => handleAddCart()} className={inStock > 0 ? 'addCart' : 'cartDisabled'}><i className="fa fa-cart-plus" aria-hidden="true"></i>ADD TO CART</button>
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