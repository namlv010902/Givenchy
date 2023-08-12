
import { IOrder } from '../../../interface/order';
import "./Order.css"
import { useEffect } from "react"
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreOrder } from '../../../store/hooks';
import { filterOrder, getUserOrder } from '../../../service/order.service';

const InvoiceList = () => {
  const navigate = useNavigate()
  const userId = JSON.parse(localStorage.getItem('userId')!);
  useEffect(() => {
    if (!userId) {
      navigate("/auth/login")
    }
  }, [])
  const {orders, dispatch} = useStoreOrder()
  useEffect(()=>{
   getUserOrder(userId).then(({data})=>{
        dispatch({
      type:'USER_GET_ORDERS',
      payload: data.order
    })
   })
  },[])
  const onHandleFilterOrder = (status: string) => {
    filterOrder(status, userId).then(({data})=>{
    dispatch({
      type:'USER_GET_ORDERS',
      payload: data.order
    })
    })
  }
  return (
    <div>
      <div className="order-main">
        <h1 >Danh sách hóa đơn</h1>
        <Button onClick={() => onHandleFilterOrder("")}>Tất cả</Button>
        <Button onClick={() => onHandleFilterOrder("Chưa xử lý")}>Chưa xử lý</Button>
        <Button onClick={() => onHandleFilterOrder("Chờ lấy hàng")}>Chờ lấy hàng</Button>
        <Button onClick={() => onHandleFilterOrder("Đang giao")}>Đang giao</Button>
        <Button onClick={() => onHandleFilterOrder("Đã nhận hàng")}>Đã nhận hàng</Button>
        <Button onClick={() => onHandleFilterOrder("Đã hủy")}>Đã hủy</Button>

        <table id="table-order">
          <thead>
            <tr >
              <th >Mã đơn hàng</th>
              <th>Trạng thái</th>
              <th>Số tiền</th>
              <th>Thanh toán</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((invoice:IOrder) => (
              <tr key={invoice._id}>
                <td>{invoice._id}</td>
                <td>{invoice.status}</td>
                <td>${invoice.totalPrice}</td>
                <td>{(invoice.pay == true) ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                <td><Link to={`/order/${invoice._id}`}><Button>Chi tiết</Button></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
