
import { IOrder } from '../../../types/order';
import "./Order.css"
import {useEffect} from "react"
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
interface IProps{
  orders:IOrder[]
  onFilterOrder(status:string,idUser:string):void
}
const InvoiceList = (props:IProps) => {
  const navigate=useNavigate()
  const idUser = JSON.parse(localStorage.getItem('userId')!);
  useEffect(()=>{
    if(!idUser){
    navigate("/auth/login")
}
  },[])

 const onHandleFilterOrder=(status:string)=>{
   props.onFilterOrder(status,idUser)
  
  
 }

  // Lọc danh sách hóa đơn theo trạng thái

  return (
    <div>
      <div className="order-main">
      <h1 >Danh sách hóa đơn</h1>
      <Button onClick={()=>onHandleFilterOrder("")}>Tất cả</Button>
      <Button onClick={()=>onHandleFilterOrder("Chưa xử lý")}>Chưa xử lý</Button>
      <Button onClick={()=>onHandleFilterOrder("Chờ xác nhận")}>Chờ xác nhận</Button>
      <Button onClick={()=>onHandleFilterOrder("Chờ lấy hàng")}>Chờ lấy hàng</Button>
      <Button onClick={()=>onHandleFilterOrder("Đang giao")}>Đang giao</Button>
      <Button onClick={()=>onHandleFilterOrder("Đã nhận hàng")}>Đã nhận hàng</Button>
      <Button onClick={()=>onHandleFilterOrder("Đã hủy")}>Đã hủy</Button>
    
      <table id="table-order">
        <thead>
          <tr >
            <th style={{backgroundColor:"#2e3553"}}>Mã đơn hàng</th>
            <th>Trạng thái</th>
            <th>Số tiền</th>
            <th>Thanh toán</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.orders?.map((invoice) => (
            <tr key={invoice._id}>
               <td>{invoice._id}</td>
              <td>{invoice.status}</td>
              <td>{invoice.totalPrice}đ</td>
              <td>{(invoice.pay ==true)?"Đã thanh toán" :"Chưa thanh toán" }</td>
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
