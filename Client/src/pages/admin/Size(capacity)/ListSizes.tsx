import { Tag } from 'antd'
import { Link } from 'react-router-dom'
import { ISize } from '../../../types/size'
import { useSizes } from '../../../hooks/useSizes'

const ListSizes = () => {
 const {sizes} = useSizes()
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
          {sizes.map((item: ISize, index: number) => (
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

export default ListSizes