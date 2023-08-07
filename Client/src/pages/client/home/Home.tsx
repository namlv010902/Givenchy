import Carousel from '../../../components/banner/banner'
import Lazyloaded from '../../../components/lazyloaded/Lazyloaded'
import './home.css'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../../../api/config'
import {useEffect,useState} from "react"
import { getProductNew } from '../../../api/products'
import { IProduct } from '../../../types/products'
import Products from '../../../components/products/Products'

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>()
  useEffect(() => {
    getProductNew().then(({ data }) => setProducts(data.product.docs)
    )
  }, [])

  return (
    <div className='home'>
      <Carousel ></Carousel>
      <div className="home-main">
        <Lazyloaded></Lazyloaded>
        <div className="title" >
         <div className="title-child"><h1>BEST SELLER</h1></div>
        </div>
        <div className="products">
         
        </div>
        <div className="banner-child">
          <div className="trendy-text">
            <h3>Trendy Perfumes</h3>
            <p>The fragrance settles into a comforting base that wraps you in a warm embrace. A gentle blend of creamy vanilla and soft musk creates a velvety and sensuous foundation.</p>
          </div>
          <div className="trendy-image">
            <img src="https://charmee-store-demo.myshopify.com/cdn/shop/files/banner-v6-img1.jpg?v=1613706648" alt="" />
          </div>
        </div>
       
        <div className="title" >
   <div className="title-child"><h1>TRENDING</h1></div> 
   
    </div>
    <div className="products">
    {products?.map((item:IProduct)=>(
          <Products product={item} ></Products>
        ))}
      
     
     
     
     
    </div>

        <div className='watch&shop'>
          <div style={{ display: "flex" }} >
            <img src="https://permia-store-demo.myshopify.com/cdn/shop/files/instagram1.jpg?v=17232624854781795367" alt="" />
            <div className="chanel" >
              <div className='chanel-img' style={{ display: "flex" }}>
                <img src="https://permia-store-demo.myshopify.com/cdn/shop/files/instagram2.jpg?v=1899475002466466195" alt="" />
                <img src="https://permia-store-demo.myshopify.com/cdn/shop/files/instagram6.jpg?v=13363452254978664427" alt="" />
              </div>
              <div className="chanel-text" >
                <h1>EVE’S ESSENCE</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis libero placerat cursus cursus. Nunc rutrum tellus a orci pretium sodales. Fusce ante odio, tristique at urna sed, condimentum ornare eros.</p>
                <button>SHOW NOW</button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home