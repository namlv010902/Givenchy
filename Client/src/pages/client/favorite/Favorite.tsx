import { Link, useNavigate } from "react-router-dom"
import './favorite.css'
import {useEffect} from  "react"

const Favorite = () => {
  const navigate = useNavigate()
  const idUser = JSON.parse(localStorage.getItem('userId')!);

  useEffect(()=>{
    if(!idUser){
      navigate("/auth/login")
    }
    },[])
  return (
    <div className="main-favorite">

        <div className="menuChild">
     <Link to="/">Home/</Link> <p> Sản phẩm yêu thích của bạn</p>
     
</div> 
{/* {(props?.favorites?.length >0) ?
<div className="favoriteProduct">
  {props?.favorites?.map((item:any)=>(
    
      <div className="item-favorite" key={item._id}>
       <div className="image-favorite">
          <img src={item.productId.image} alt="" />
       </div>
       <div className="content-favorite">
        <h3>{item.productId.name}</h3>

        <p id="fv-desc">{item.productId.desc}</p>
        <strong id="price">${item.productId.price}</strong> <br />
       <Button> <i className="fa fa-cart-plus" aria-hidden="true"> </i>Thêm giỏ hàng</Button> <br />
       <i className="fa-regular fa-circle-xmark"></i>
       </div>
      </div>
  ))}
    

     </div>
     : <h3>Không có sản phẩm yêu thích</h3> } */}
    </div>
  )
}

export default Favorite