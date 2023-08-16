import './header.css'

import { Popover } from 'antd';
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react';
import { useStoreCart, useStoreUser } from '../../store/hooks';
import { getProfile } from '../../service/auth.service';
import ProductInCart from '../products-in-cart/ProductInCart';
import Search from '../search/Search';
import { scrollToTop } from '../../service/config.service';
const Header = () => {
  const { dispatch } = useStoreCart()
  const { user, dispatchUser } = useStoreUser()
  const accessToken = JSON.parse(localStorage.getItem('accessToken')!);
  const navigate = useNavigate()
  // console.log(user);
  
  useEffect(() => {
    if (accessToken) {
      // console.log(accessToken);
      
      getProfile().then(({ data }) => {
        dispatchUser({
          type: "GET_PROFILE",
          payload: data.user
        })
      })
        .catch(({ response }) => {
          // console.log('Error fetching user:', error);
          // hết phiên đăng nhập 
          if (response.data.message === "Token is expired") {
            localStorage.removeItem("accessToken");
          }
        })
    }
  }, [accessToken])
  //  console.log(user);
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    dispatch({
      type: 'DELETE_ALL_PRODUCTS_IN_CART'
    })
    dispatchUser({
      type: 'GET_PROFILE',
    })
    navigate('/')
  }
  const myAccount = (
    <div style={{ textAlign: "center" }}>
      <Link to="/profile" onClick={() => scrollToTop()}>Account</Link> <br />
      <p style={{ cursor: "pointer", color: "#e74c3c" }} onClick={() => handleLogout()}>Log out</p>
    </div>
  );
  const content = (
    <div>
      <Link to="/auth/register" onClick={() => scrollToTop()}>Register</Link> <br />
      <Link to="/auth/login" onClick={() => scrollToTop()}>Log in</Link>
    </div>
  );
  return (
    <div className='header'>
      <header>
        <div className='logo'>
          <Link onClick={() => scrollToTop()} to="/"> <img height="60px" src="https://charmee-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1613708277" alt="" /></Link>
        </div>
        <nav>
          <ul>
            <li><Link onClick={() => scrollToTop()} to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
            <li><Popover ><Link onClick={() => scrollToTop()} to="/products">Product <i className='fa-solid fa-chevron-down'></i></Link></Popover> </li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </nav>
        <Search></Search>
        <div className="action">
          <Link onClick={() => scrollToTop()} to="/order"> <i title="Đơn hàng của bạn" className="fa fa-money-bill"></i> </Link>
          <ProductInCart></ProductInCart>
          <Link onClick={() => scrollToTop()} to="favorite"><i title='Sản phẩm yêu thích của bạn' className="fa fa-heart-o" aria-hidden="true"></i> </Link>
          {!user?.avatar ? <Popover content={content} placement="bottom" >
            <i className="fa fa-user-o" aria-hidden="true"></i>
          </Popover>
            : <Popover placement='bottom' content={myAccount}><Link onClick={() => scrollToTop()} to="/profile"><img title="Tài khoản của bạn" id='avatar' src={user.avatar} alt="" /></Link></Popover>
          }
        </div>
      </header>
    </div>
  )
}
export default Header