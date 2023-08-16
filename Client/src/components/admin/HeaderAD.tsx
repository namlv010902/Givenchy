import { Link } from "react-router-dom"
import Search from "../search/Search"
import { scrollToTop } from "react-scroll/modules/mixins/animate-scroll"

const HeaderAD = () => {
  return (
    <div className='header' style={{boxShadow:"0px 5px 21px -5px #CDD1E1"}}>
    <header>
      <div className='logo'>
        <Link onClick={()=>scrollToTop()} to="/"> <img height="60px" src="https://charmee-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1613708277" alt="" /></Link>
      </div>
      <Search></Search>
     
     <div id="avatar" style={{display:"flex"}}>
      <div className="action" style={{marginLeft:"-150px"}}>
      <i className="fa fa-bell" aria-hidden="true"></i>
      <i className="fa-solid fa-envelope"></i>
      </div>
        <img style={{width:"100%"}} src="https://demo.bootstrapdash.com/skydash/template/images/faces/face28.jpg" alt="" />
     </div>
    </header>
  </div>
  )
}

export default HeaderAD