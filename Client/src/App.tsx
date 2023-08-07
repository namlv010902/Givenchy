import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './layout/Layout'
// import { useLocation } from 'react-router-dom';
import Home from './pages/client/home/Home'
import './App.css'
import DetailProduct from './pages/client/detail-product/DetailProduct'
import Cart from './pages/client/cart/Cart'
import Products from './pages/client/productsPage/ProductsPage'
import Login from './pages/auth/login/Login'
import { Register } from './pages/auth/register/Register'
import NotFoundPage from './pages/not-found-page/NotFoundPage'
import Profile from './pages/client/profile/Profile'
import Favorite from './pages/client/favorite/Favorite'
import Blog from './pages/client/Blog/Blog'
import News from './pages/client/news/News'
import { addToCart, getCart, removeProductInCart, updateCart } from './api/cart'
import { toast } from "react-toastify"
import { createProduct, filterPrice, getAll, getBrand, getCategoryProducts, paginateCategoryProducts, paginateProduct, searchProduct, sortProduct, updateProduct } from './api/products'
import { IProduct } from './types/products'
import axios from 'axios'
import { ICate } from './types/categories'
import InvoiceList from './pages/client/order/Orders'
import OrderDetail from './pages/client/order-detail/OrderDetail'
import { IOrder } from './types/order'
import { createOrder, filterOrder, getUserOrder } from './api/order'
import { createComment } from './api/comment'
import SuccessMessage from './pages/client/succsess-message/SuccsesMessage'
import { getFavoriteUser } from './api/favorite'
import { getUser, login, updateProfile } from './api/auth'
import Swal from 'sweetalert2'
import LayoutAD from './layout/LayoutAD'
import ListProducts from './pages/admin/products/ListProducts'
import CreateProduct from './pages/admin/products/CreateProduct'
import UpdateProduct from './pages/admin/products/UpdateProduct'
import SendTokenMail from './pages/client/mail/SendTokenMail';
import VerifyTokenMail from './pages/client/mail/VerifyTokenMail';
import ForgotPassword from './pages/client/forgotPassword/ForgotPassword';
import { getCategories } from './api/categories'
import ProductsPage from './pages/client/productsPage/ProductsPage'

function App() {
  // const location = useLocation();
  // const token = decodeURIComponent(location.pathname.split('/').pop()!);
  const [loading, setLoading] = useState(true)
  const [resetPage, setResetPage] = useState(false)
  const navigate = useNavigate()
  const idUser = JSON.parse(localStorage.getItem('userId')!) || {};
  const [user, setUser] = useState()
  useEffect(()=>{
  getUser(idUser).then(({data})=>{
    setUser(data.user)
  })
  },[])


  
  const logOut=async()=>{
  localStorage.removeItem("userId")
      setUser(undefined)
    navigate("/")
  }
  const handleLogin = (data: any) => {
    console.log('Success:', data);
    login(data).then(({data})=>{
      data.user.role=="admin" ? navigate("/admin") :  navigate("/")

      toast.success("Login Success")
    localStorage.setItem("userId",JSON.stringify(data.user._id ))
    const userId =JSON.parse(localStorage.getItem("userId")!)
   console.log(userId);
      getUser(userId).then(({data})=>{
        setUser(data.user)    
      })
      console.log(data.user);
    })
    .catch(()=>{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast:any) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: 'Sai thông tin đăng nhập'
      })
    } )
  };
  const handleUpdateProfile = (data: any,callback:()=>void) => {
    
    data["userId"] = idUser
     updateProfile(data).then(()=>{
      getUser(idUser).then(({data})=>{
        setUser(data.user)
      })
      toast.success("Profile updated successfully")
      callback()
     })
     .catch(({response})=>  toast.error(response.data.message)
     )
  };
  const [brand, setBrand] = useState()

  useEffect(()=>{
    getBrand().then(({data})=>setBrand(data.brand)
    )
  },[])

  const [products, setProducts] = useState<IProduct[]>()
  useEffect(() => {
    getAll().then(({ data }) =>{
      setProducts(data.product.docs)
      setLoading(false)
    }
    )
  }, [])
  const handlePrice = (min: number, max: number) => {
    filterPrice(min, max).then(({ data }) => setProducts(data.filter))
  }
  
  const onSearch = (value: any) => {
    searchProduct(value).then(({ data }) => {
      setProducts(data.product.docs)
    })
  }
  const [totalPage, setToTalPage] = useState(0)
useEffect(()=>{
  axios.get("http://localhost:8080/api/product/").then(({ data }) => {
    setToTalPage((data.product.totalPages) * 10)
  })
},[])
const [idCate, setIdCate] = useState("")
  const handleCategoryProducts = (id: string) => {
    setIdCate(id)
    getCategoryProducts(id).then(({ data }) =>{
      setProducts(data.products.docs)   
      setToTalPage((data.products.totalPages) * 10)
      setResetPage(true)
    } )
  }
  const handlePageChange = (page: any) => {
    if(resetPage){
      paginateCategoryProducts(idCate,page).then(({ data }) => {
        console.log(data.products);
        setToTalPage((data.products.totalPages) * 10)
        setProducts(data.products.docs)   })
        console.log("Page hiện tại: " + page, "/Tổng page: " + totalPage);
        return
    }
    paginateProduct(page).then(({ data }) => {
      console.log(data);
      setToTalPage((data.product.totalPages) * 10)
      setProducts(data.product.docs)   })
      console.log("Page hiện tại: " + page, "/Tổng page: " + totalPage); 
  };

  const handleSortChange = (value: any) => {
    console.log(value);
    sortProduct(value).then(({ data }) => {
      console.log(data.product.docs);
      setProducts(data.product.docs)
    })
  };
  const handleUpdateProduct=(id:string,data:any)=>{
    updateProduct(id,data).then(()=>{
      toast.success("Updated product")
      navigate("/admin/products")
      getAll().then(({ data }) => setProducts(data.product.docs))

    })
  }
  const handleCreateProduct=(data:any)=>{
    createProduct(data).then(()=>{
      toast.success("Created product")
      navigate("/admin/products")
      getAll().then(({ data }) => setProducts(data.product.docs))

    })
  }
  const [categories, setCategories] = useState()
  useEffect(() => {
    getCategories().then(({ data }) => {
      setCategories(data.category)
      setLoading(false)
    })
  }, [])

  

  const [orders, setOrders] = useState<IOrder[]>()
  useEffect(() => {
    getUserOrder(idUser).then(({ data }) => setOrders(data.order))
  }, [])
  const onFilterOrder = (status: string, idUser: string) => {
    filterOrder(status, idUser).then(({ data }) => setOrders(data.order))
  }
  const handleCreateOrder = (data: any) => {
    createOrder(data).then(({ data }) => {
      setCart(data);
      navigate("/message")
      getUserOrder(idUser).then(({ data }) => setOrders(data.order))})
  }
  const [cart, setCart] = useState({})
  useEffect(() => {
    getCart(idUser).then(({ data }) => {
      setCart(data.cart)
    })
  }, [])
  const handleAddToCart = (data: any) => {
    addToCart(data).then(({ data }) => {
      setCart(data.cart);
      toast.success("Đã thêm vào giỏ hàng") })
  }
  const handleUpdateCart = (data: any) => {
    updateCart(data).then(({ data }) => {
      setCart(data.cart) })
  }
  const removeOneProductInCart = (productId: string,sizeId:string) => {
    console.log(productId, idUser);
    removeProductInCart(productId,sizeId,idUser).then(({ data }) => {
      setCart(data.cart) })
      .catch((err)=>console.log(err)
      )
  }
  const handleCreateComment = (data: any) => {
    createComment(data)
  }
  const [favorites, setFavorites] = useState()
  useEffect(() => {
    getFavoriteUser(idUser).then(({ data }) => setFavorites(data.favorites))
  }, [])
  const handleAddFavorite = (id: string) => {
   
    

  }


  return (
    <div>
      <Routes>
        <Route path='' element={<Layout categories={categories} cart={cart} removeOneProductInCart={removeOneProductInCart} user={user} logOut={logOut} />}>
          <Route path='/' element={<Home handleAddToCart={handleAddToCart} />}></Route>
          <Route path='/products' element={<ProductsPage categories={categories} loading={loading} brand={brand}  handleAddToCart={handleAddToCart}  handlePrice={handlePrice}
            handleCategoryProducts={handleCategoryProducts}
            onSearch={onSearch} totalPage={totalPage} onSort={handleSortChange} onPage={handlePageChange} products={products} />}></Route>
          <Route path='product/:id' element={<DetailProduct handleCreateComment={handleCreateComment} handleAddToCart={handleAddToCart} />}></Route>
          <Route path='cart' element={<Cart cart={cart} handleCreateOrder={handleCreateOrder} removeOneProductInCart={removeOneProductInCart} updateCart={handleUpdateCart} />}></Route>
          <Route path='auth/login' element={<Login handleLogin={handleLogin} />}></Route>
          <Route path='auth/register' element={<Register />}></Route>
          <Route path='profile' element={<Profile user={user} handleUpdateProfile={handleUpdateProfile} />}></Route>
          <Route path='favorite' element={<Favorite favorites={favorites} />}></Route>
          <Route path='blog' element={<Blog />}></Route>
          <Route path='news' element={<News />}></Route>
          <Route path='order' element={<InvoiceList onFilterOrder={onFilterOrder} orders={orders} />}></Route>
          <Route path='order/:id' element={<OrderDetail />}></Route>
          <Route path='message' element={<SuccessMessage />}></Route>
          <Route path='sendTokenMail/' element={<SendTokenMail />}></Route>
          <Route path='verifyTokenMail/' element={<VerifyTokenMail />}></Route>
          <Route path='forgotPassword/' element={<ForgotPassword />}></Route>
          
          <Route path='*' element={<NotFoundPage />}></Route>
        </Route>
        <Route path='admin' element={<LayoutAD user={user} />}>
        <Route path='products' element={<ListProducts products={products} />}></Route>
        <Route path='product/add' element={<CreateProduct  categories={categories} handleCreateProduct={handleCreateProduct} />}></Route>
        <Route path='product/update/:id' element={<UpdateProduct handleUpdateProduct={handleUpdateProduct} />}></Route>
        </Route>

      </Routes>
    </div>
  )
}

export default App
