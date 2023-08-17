import { Pagination, Tag } from "antd"
import { useStoreProducts } from "../../../store/hooks"
import { useEffect, useState } from "react"
import { deleteProduct, getAll, paginateProduct } from "../../../service/products.service"
import { IProduct, IResSize } from "../../../types/products"
import { ISize } from "../../../types/size"
import { Link } from "react-router-dom"

const ListProducts = () => {
  const { products, dispatch } = useStoreProducts()
  const [totalPage, setToTalPage] = useState(0)
  useEffect(() => {
    getAll().then(({ data }) => {
      dispatch({
        type: "GET_PRODUCTS",
        payload: data.product.docs
      })
      setToTalPage((data.product.totalPages) * 10)
    })
  }, [])
  const handlePageChange = (page: any) => {
    // if (resetPage) {
    //   paginateCategoryProducts(idCate, page).then(({ data }) => {
    //     console.log(data.products);
    //     setToTalPage((data.products.totalPages) * 10)
    //     setProducts(data.products.docs)
    //   })
    //   console.log("Page hiện tại: " + page, "/Tổng page: " + totalPage);
    //   return
    // }
    paginateProduct(page).then(({ data }) => {
      console.log(data);
      setToTalPage((data.product.totalPages) * 10)
      dispatch({
        type: 'GET_PRODUCTS',
        payload: data.product.docs
      })
    })
    console.log("Page hiện tại: " + page, "/Tổng page: " + totalPage);
  };
  const onHandleRemove = (id: string) => {
    if (window.confirm('Are you sure?')) {
      deleteProduct(id).then(() => {
        getAll().then(({ data }) => {
          dispatch({
            type: "GET_PRODUCTS",
            payload: data.product.docs
          })
          setToTalPage((data.product.totalPages) * 10)
          alert(data.message)
        })
        .catch(({response})=>{
          alert(response.data.message)
      })
      })
    }

  }
  return (
    <div style={{ padding: "  50px" }} >
      <table id="table-order" style={{ width: "1150px" }}>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Capacity</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: IProduct, index: number) => (
            <tr>
              <td>{index + 1}</td>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td><img src={product.image} alt="" /></td>
              <td>${product.sizes[0].price}</td>
              <td>{product.brandId.name}</td>
              <td>{product.sizes.map((item: IResSize) => (
                <p>{item.sizeId.name},</p>
              ))}</td>
              <td>{product.categoryId.name}</td>
              <td>
                <Link to={`../product/update/${product._id}`}> <Tag color="green">Edit</Tag></Link>
                <Tag color="red" onClick={() => onHandleRemove(product._id)}>Delete</Tag>
              </td>
            </tr>
          ))}

        </tbody>


      </table>
      <div id='page' style={{ marginTop: "30px" }}>
        <Pagination style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          defaultCurrent={1} total={totalPage}
          onChange={(e) => handlePageChange(e)
          } />
      </div>
    </div>
  )
}

export default ListProducts