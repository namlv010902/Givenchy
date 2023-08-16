import { Link, useNavigate } from "react-router-dom"
import './favorite.css'
import { useEffect } from "react"
import { useStoreFavorite } from "../../../store/hooks"
import { getFavoriteUser, updateFavorite } from "../../../service/favorite.service"

const Favorite = () => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('accessToken')!);
  const {favorites, dispatch} = useStoreFavorite()
  useEffect(() => {
    if (!accessToken) {
      navigate("/auth/login")
    }else{
      getFavoriteUser().then(({data})=>{
        dispatch({
          type:'GET_FAVORITES_USER',
          payload:data.favorites,
        })
      })
    }
  }, [accessToken])
  const handUpdateFavorite =(id:string)=>{
  updateFavorite(id).then(()=>{
    getFavoriteUser().then(({data})=>{
      dispatch({
        type:'GET_FAVORITES_USER',
        payload:data.favorites,
      })
    })

  })
  }
  return (
    <div className="main-favorite">

      <div className="menuChild" >
        <Link to="/">Home/</Link> <p> Your favorite product</p>

      </div>

      <div className="favoriteProduct">
        {favorites?.map((item: any) => (

          <div className="item-favorite" key={item._id}>
            <div className="image-favorite">
              <Link to={`/product/${item.productId._id}`}>  <img src={item.productId.image} alt="" /></Link>
            </div>
            <div className="content-favorite">
              <h3>{item.productId.name}</h3>
              <strong id="price">${item.productId.sizes[0].price}</strong> <br />
              <p id="fv-desc">{item.productId.description}</p>

              {/* <Button> <i className="fa fa-cart-plus" aria-hidden="true"> </i>Thêm giỏ hàng</Button> <br /> */}
              <i id="removeFavorite" onClick={() =>handUpdateFavorite(item.productId._id)} className="fa-regular fa-circle-xmark"></i>
            </div>
          </div>
        ))}

      </div>
    </div>

  )
}

export default Favorite