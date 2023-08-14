
import { Pagination, Select, Slider } from 'antd';
import { IProduct } from '../../../common/products';
import './products.css';
import {  useEffect } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategories } from '../../../service/categories.service';
import Products from '../../../components/products/Products';
import { useStoreCategory } from '../../../store/hooks';
import { ISize } from '../../../common/size';
interface IProps {
  products: IProduct[],
  totalPage: number,
  onPage(page: number): void
  onSort(value: any): void
  handlePrice(min: number, max: number): void
  handleCategoryProducts(id: string): void
  handleAddToCart(data: any): void
  productByGender(gender:string): void
  sizes:ISize[]
  handleProductsBySize(sizeId:string): void
  loading:boolean
  brand:any
  handleProductByBrand(id:string):void
}
const ProductsPage = (props: IProps) => {
  console.log(props.totalPage);
  const { categories, dispatch } = useStoreCategory()
  useEffect(() => {
    getCategories().then(({ data }) => {
      dispatch({
        type: 'GET_CATEGORIES',
        payload: data.category
      })
    })
  }, [])


  const onChangePrice = (value: any) => {
    const min = value[0]
    const max = value[1]
    props.handlePrice(min, max)
  }

  const gender =['Man', 'Woman', 'Unisex']
  return (
    <div>
      <ToastContainer></ToastContainer>

      <div className="product-main" >
        <main>
          <aside>
            <div className="item-aside">
              <h3>Categories</h3>
              <div className="cate">
                {categories?.map((item: any) => {
                  return (
                    <button key={item._id} onClick={() => props.handleCategoryProducts(item._id)}> {item?.name}</button>
                  )
                })}


              </div>
            </div>

            <div className="item-aside">
              <h3>Filter price</h3>
              <Slider style={{ width: 200 }} range onChange={onChangePrice} defaultValue={[100, 1000]} max={1000} />
            </div>
            <div className="item-aside">
              <h3>Brand</h3>
              {props?.brand?.map((item: any) => (
                <button onClick={()=>props.handleProductByBrand(item._id)}>{item.name}</button>
              ))}
            </div>
            <div className="item-aside">
              <h3>Gender</h3>
              {gender.map((item:any)=>(
                <button onClick={()=>props.productByGender(item)}>{item}</button>
              ))}
            </div>
            <div className="item-aside">
              <h3>Size</h3>
              {props?.sizes?.map((item:any)=>(
                <button onClick={()=>props.handleProductsBySize(item._id)}>{item.name}</button>
              ))}
             
            </div>
          </aside>
          <article>
            <div className="banner-product">
              <div className="banner-text">
                <h3>celebrity perfumes</h3>
                <h3>For Man & Woman</h3>
                <button>SHOW NOW</button>
              </div>
            </div>
            <div id='tab'>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <p>Ghế: Tìm được 300 kết quả</p> */}
              </div>

              <Select

                defaultValue="Sort by name"
                onChange={(e) => props.onSort(e)}
                options={[
                  { value: "asc", label: 'A - Z' },
                  { value: "desc", label: 'Z - A' },

                ]}
              />
            </div>
            {props.loading ? <div className="loanding"><img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" /></div> :
              <div>
                <div className="products" >

                  {props.products?.map((item) => {
                    return (
                      <Products product={item}></Products>
                    )
                  })}

                </div>

                <div id='page'>
                  <Pagination style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    defaultCurrent={1} total={props.totalPage}
                    onChange={(e) => props.onPage(e)
                    } />
                </div>
              </div>
            }
          </article>

        </main>
      </div>
    </div>
  )
}

export default ProductsPage