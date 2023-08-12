import './header.css'
import { Button } from 'antd';
import { Popover } from 'antd';
import { Link, useNavigate } from "react-router-dom"
import { searchProduct } from '../../service/products.service';
import { useEffect, useState } from 'react';
import { IProduct } from '../../interface/products';
import { useStoreCart, useStoreUser } from '../../store/hooks';
import { getCart, removeProductInCart } from '../../service/cart.service';
import { getUser } from '../../service/auth.service';

const Header = () => {

  const { cart, dispatch } = useStoreCart()
  const { user, dispatchUser } = useStoreUser()
  let countProductInCart = cart?.products?.length || 0
  const [products, setProducts] = useState<IProduct[]>()
  const userId = JSON.parse(localStorage.getItem('userId')!);
  const navigate =useNavigate()
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getCart(userId)
        dispatch({
          type: "GET_CART",
          payload: data.cart
        })
      } catch (error) {
        console.log('Error fetching cart:', error);
      }
    }
   if(userId){
    getData()
   }
  }, [])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUser(userId)
        dispatchUser({
          type: "GET_PROFILE",
          payload: data.user
        })
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    }
    if(userId){
      fetchUser()
    }
    
  }, [])
  //  console.log(user);
  
  const handleSearch = (value: any) => {
    console.log(value);
    searchProduct(value).then(({ data }) => {
      setProducts(data.product.docs)
    })
  }
  const handleLogout=()=>{
    localStorage.removeItem('userId')
    localStorage.removeItem('accessToken')
    dispatch({
      type:'DELETE_ALL_PRODUCTS_IN_CART'
    })
     dispatchUser({
      type:'GET_PROFILE',

    })
    navigate('/')
  }
  const myAccount = (
    <div style={{textAlign:"center"}}>
      <Button >YOU ACCOUNT</Button> <br />
      <Button onClick={()=>handleLogout()}>LOG OUT</Button>
    </div>
  );
  const content = (
    <div>
      <Link to="/auth/register">REGISTER</Link> <br />
      <Link to="/auth/login">LOGIN</Link>
    </div>
  );
  const showSearch = (
    <div className='show-search'>
      {products?.map(item => {
        return (
          <div key={item._id} >
            <Link className="item-cart" to={`/product/${item._id}`}>
              <div className="image-cart">
                <img src={item.image} alt="" />
              </div>
              <div className="product-in-search">
                <p id='search-name'>{item.name}</p>
                <strong id='price'>${item.sizes[0].price} </strong>
              </div>
            </Link>
          </div>
        )
      })}
      {products?.length == 0 && <p>Ko tìm thấy</p>}
    </div>
  )
  const handleRemove = (id: string) => {
    removeProductInCart(id, userId);
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
        <Link to="/cart"> <button className="btn-show-cart" >View cart</button></Link>
      </div> : <p style={{ textAlign: "center" }}> <i className="fa-regular fa-circle-exclamation"></i>Cart empty </p>
      }
    </div>
  )
  return (
    <div className='header'>
      <header>
        <div className='logo'>
          <Link to="/"> <img height="60px" src="https://charmee-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1613708277" alt="" /></Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
            <li><Popover ><Link to="/products">Product <i className='fa-solid fa-chevron-down'></i></Link></Popover> </li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </nav>
        <form action="#" id="formSearch" >
          <Popover title={showSearch}> <input onChange={e => handleSearch(e.target.value)} id="inputSearch" type="text" name="" placeholder="Search..." /></Popover>
          <button className='btn-search'><i className="fa fa-search" aria-hidden="true"></i></button>
        </form>
        <div className="action">
          <Link to="/order"> <i title="Đơn hàng của bạn" className="fa fa-money-bill"></i> </Link>

          <Popover content={showCart} placement="bottom" >
            <Link to="/cart" id='dropCart'>  <i title='Giỏ hàng của bạn' className='fa fa-shopping-basket'></i> <p>{countProductInCart}</p> </Link></Popover>

          <Link to="favorite"><i title='Sản phẩm yêu thích của bạn' className="fa fa-heart-o" aria-hidden="true"></i> </Link>

          {!user?.avatar ? <Popover content={content} placement="bottom" >
           <i className="fa fa-user-o" aria-hidden="true"></i>
          </Popover>
            : <Popover placement='bottom' content={myAccount}><Link to="/profile"><img title="Tài khoản của bạn" id='avatar' src={user.avatar} alt="" /></Link></Popover>
          }
        </div>
      </header>
    </div>
  )
}
export default Header