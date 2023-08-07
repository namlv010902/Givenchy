import { Link } from "react-router-dom"
import { IProduct } from "../../types/products"
import { scrollToTop } from "../../api/config"
interface IProps{
  product:IProduct,
 

}
const Products = (props:IProps) => {
  return (
    <div className="colum"  key={props.product._id}>
    <div className="image">
     
     <img src={props.product.image} alt="" />
     <i id='heart' className="fa fa-heart-o" aria-hidden="true"></i>
     <div className="icon">
   <Link to={`/product/`+props.product._id}> <i onClick={()=>scrollToTop()} className="fa fa-eye" aria-hidden="true"></i></Link> 
      <i  className="fa fa-cart-plus" aria-hidden="true"></i>
     </div>
    </div>
    <div className="content">
    
      <p>{props.product.name}</p>
      <strong>${props.product.sizes[0].price}</strong>
  
    </div>
  </div>
  )
}

export default Products