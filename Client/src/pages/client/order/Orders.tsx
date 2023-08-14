
import { IOrder } from '../../../common/order';
import "./Order.css"
import { useEffect } from "react"
import { Button,Tag } from 'antd';
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
  const { orders, dispatch } = useStoreOrder()
  useEffect(() => {
    getUserOrder(userId).then(({ data }) => {
      dispatch({
        type: 'USER_GET_ORDERS',
        payload: data.order
      })
    })
  }, [])
  const onHandleFilterOrder = (status: string) => {
    filterOrder(status, userId).then(({ data }) => {
      dispatch({
        type: 'USER_GET_ORDERS',
        payload: data.order
      })
    })
  }
  return (
    <div>
      <div className="order-main">
        <h1 >Invoice</h1>
        <Button onClick={() => onHandleFilterOrder("")}>All</Button>
        <Button onClick={() => onHandleFilterOrder("Pending")}>Pending</Button>
        <Button onClick={() => onHandleFilterOrder("Processing")}>Processing</Button>
        <Button onClick={() => onHandleFilterOrder("In transit")}>In transit</Button>
        <Button onClick={() => onHandleFilterOrder("Received")}>Received</Button>
        <Button onClick={() => onHandleFilterOrder("Cancelled")}>Cancelled</Button>

        <table id="table-order">
          <thead>
            <tr >
              <th >Invoice ID</th>
              <th>Status</th>
              <th>Total price</th>
              <th>Payment status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((invoice: IOrder) => (
              <tr key={invoice._id}>
                <td>{invoice._id}</td>
                <td>{invoice.status}</td>
                <td>${invoice.totalPrice}</td>
                <td>{(invoice.pay == true) ? "Paid" : "Unpaid"}</td>
                <td><Link to={`/order/${invoice._id}`}><Tag color="blue"> View</Tag></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
