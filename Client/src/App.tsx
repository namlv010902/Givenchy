import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/client/home/Home'
import './App.css'
import DetailProduct from './pages/client/detail-product/DetailProduct'
import Cart from './pages/client/cart/Cart'
import Login from './pages/auth/login/Login'
import { Register } from './pages/auth/register/Register'
import NotFoundPage from './pages/not-found-page/NotFoundPage'
import Profile from './pages/client/profile/Profile'
import Favorite from './pages/client/favorite/Favorite'
import Blog from './pages/client/Blog/Blog'
import News from './pages/client/news/News'
import { toast } from "react-toastify"
import { createProduct, filterPrice, getAll, getCategoryProducts, getProductsByGender, paginateCategoryProducts, paginateProduct, searchProduct, sortProduct, updateProduct } from './service/products.service'
import { IProduct } from './common/products'
import axios from 'axios'
import InvoiceList from './pages/client/order/Orders'
import OrderDetail from './pages/client/order-detail/OrderDetail'
import SuccessMessage from './pages/client/succsess-message/SuccsesMessage'
import LayoutAD from './layout/LayoutAD'
import ListProducts from './pages/admin/products/ListProducts'
import CreateProduct from './pages/admin/products/CreateProduct'
import UpdateProduct from './pages/admin/products/UpdateProduct'
import SendTokenMail from './pages/client/mail/SendTokenMail';
import VerifyTokenMail from './pages/client/mail/VerifyTokenMail';
import ForgotPassword from './pages/client/forgotPassword/ForgotPassword';
import { getCategories } from './service/categories.service'
import ProductsPage from './pages/client/productsPage/ProductsPage'
import Checkout from './pages/client/checkout/Checkout'
import { getProductsBySize, getSizes } from './service/size.service'
import { getBrands, getProductsByBrand } from './service/brand.service'
import ChangePassword from './pages/client/changePassword/ChangePassword'

function App() {
  const [loading, setLoading] = useState(true)
  const [resetPage, setResetPage] = useState(false)
  const navigate = useNavigate()
  const [brand, setBrand] = useState()
  useEffect(() => {
    getBrands().then(({ data }) => setBrand(data.brand)
    )
  }, [])
  const handleProductByBrand = (id:string) =>{
  getProductsByBrand(id).then(({ data }) => setProducts(data.products.docs))
  }
  const [products, setProducts] = useState<IProduct[]>()
  useEffect(() => {
    getAll().then(({ data }) => {
      setProducts(data.product.docs)
      setLoading(false)
    }
    )
  }, [])
  const handlePrice = (min: number, max: number) => {
    filterPrice(min, max).then(({ data }) => setProducts(data.filteredProducts))
  }
  const onSearch = (value: any) => {
    searchProduct(value).then(({ data }) => {
      setProducts(data.product.docs)
    })
  }
  const [totalPage, setToTalPage] = useState(0)
  useEffect(() => {
    axios.get("http://localhost:8080/api/product/").then(({ data }) => {
      setToTalPage((data.product.totalPages) * 10)
    })
  }, [])
  const [idCate, setIdCate] = useState("")
  const handleCategoryProducts = (id: string) => {
    setIdCate(id)
    getCategoryProducts(id).then(({ data }) => {
      setProducts(data.products.docs)
      setToTalPage((data.products.totalPages) * 10)
      setResetPage(true)
    })
  }
  const handlePageChange = (page: any) => {
    if (resetPage) {
      paginateCategoryProducts(idCate, page).then(({ data }) => {
        console.log(data.products);
        setToTalPage((data.products.totalPages) * 10)
        setProducts(data.products.docs)
      })
      console.log("Page hiện tại: " + page, "/Tổng page: " + totalPage);
      return
    }
    paginateProduct(page).then(({ data }) => {
      console.log(data);
      setToTalPage((data.product.totalPages) * 10)
      setProducts(data.product.docs)
    })
    console.log("Page hiện tại: " + page, "/Tổng page: " + totalPage);
  };
  const handleSortChange = (value: any) => {
    console.log(value);
    sortProduct(value).then(({ data }) => {
      console.log(data.product.docs);
      setProducts(data.product.docs)
    })
  };
  const handleUpdateProduct = (id: string, data: any) => {
    updateProduct(id, data).then(() => {
      toast.success("Updated product")
      navigate("/admin/products")
      getAll().then(({ data }) => setProducts(data.product.docs))
    })
  }
  const handleCreateProduct = (data: any) => {
    createProduct(data).then(() => {
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
  const productByGender =(gender:string)=>{
  getProductsByGender(gender).then(({ data }) => {
  setProducts(data.products.docs)
  })
  }
  const [sizes, setSizes] = useState()
  useEffect(()=>{
  getSizes().then(({data})=>setSizes(data.size))
  },[])
  const handleProductsBySize=(id:string)=>{
  getProductsBySize(id).then(({data})=>setProducts(data.products.docs))
  }

  return (
    <div>
      <Routes>
        <Route path='' element={<Layout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products' element={<ProductsPage handleProductsBySize={handleProductsBySize} productByGender={productByGender} sizes={sizes} loading={loading} brand={brand} handlePrice={handlePrice}
           handleProductByBrand={handleProductByBrand}
           handleCategoryProducts={handleCategoryProducts}
            onSearch={onSearch} totalPage={totalPage} onSort={handleSortChange} onPage={handlePageChange} products={products} />}></Route>
          <Route path='product/:id' element={<DetailProduct />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='auth/login' element={<Login />}></Route>
          <Route path='auth/register' element={<Register />}></Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='favorite' element={<Favorite />}></Route>
          <Route path='blog' element={<Blog />}></Route>
          <Route path='news' element={<News />}></Route>
          <Route path='order' element={<InvoiceList />}></Route>
          <Route path='order/:id' element={<OrderDetail />}></Route>
          <Route path='message' element={<SuccessMessage />}></Route>
          <Route path='sendTokenMail/' element={<SendTokenMail />}></Route>
          <Route path='verifyTokenMail/' element={<VerifyTokenMail />}></Route>
          <Route path='forgotPassword/' element={<ForgotPassword />}></Route>
          <Route path='changePassword/' element={<ChangePassword />}></Route>
          <Route path='checkout/' element={<Checkout />}></Route>
          <Route path='*' element={<NotFoundPage />}></Route>
        </Route>
        <Route path='admin' element={<LayoutAD />}>
          <Route path='products' element={<ListProducts products={products} />}></Route>
          <Route path='product/add' element={<CreateProduct categories={categories} handleCreateProduct={handleCreateProduct} />}></Route>
          <Route path='product/update/:id' element={<UpdateProduct handleUpdateProduct={handleUpdateProduct} />}></Route>
        </Route>
      </Routes>
    </div>
  )
}
export default App
