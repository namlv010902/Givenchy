import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IProduct } from '../../../interface/products';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
interface IProps {
  products: IProduct[]
}
const ListProducts = (props: IProps) => {

  const columns: ColumnsType<IProduct[]> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (imageUrl: string) => <img src={imageUrl} alt="Product" width="150" />,

    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Material',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (category: any) => <p>{category?.name}</p>

    },
 
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button> <Link to={`/admin/product/update/${record?._id}`}> Update</Link></Button>
          <Button>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div  >
      <ToastContainer></ToastContainer>
      <Table columns={columns} dataSource={props.products} />
    </div>
  )
}

export default ListProducts