import { Link } from 'react-router-dom'
import { useBrand } from '../../../hooks/useBrand'
import { IBrand } from '../../../types/brand'
import { Tag } from 'antd'

const ListBrands = () => {
  const {brand} = useBrand()
  return (
    <div style={{ padding: "  50px" }} >
    <table id="table-order" style={{ width: "1150px" }}>
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Name</th>
          <th>Product count</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {brand?.map((item: IBrand, index: number) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.productId.length}</td>
            <td>
              <Link to={`../category/update/${item._id}`}> <Tag color="green">Edit</Tag></Link>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default ListBrands