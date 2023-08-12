import { Button } from "antd"
import { useState, useEffect } from "react"
import "./OrderDetail.css"
import { useParams } from "react-router-dom"
import { cancelOrder, orderDetail, resetOrder } from "../../../service/order.service"

const OrderDetail = () => {
  const { id } = useParams()
  const [detailOrder, setDetailOrder] = useState()
  const [remainingTime, setRemainingTime] = useState()
  useEffect(() => {
    orderDetail(id).then(({ data }) => {
      setDetailOrder(data.order)
      setRemainingTime(data.remainingTimeMessage)
    })
  }, [])


  var checkTime = new Date(detailOrder?.createdAt);
  var outTime = checkTime.toLocaleString();
  console.log(outTime);
  console.log(remainingTime);
  const handleCancel = (id: string) => {
    cancelOrder(id).then(({ data }) => {
      setDetailOrder(data.order)
      setRemainingTime(data.remainingTimeMessage)
    })

  }


  return (
    <div>
      
      <div className="order-main">
      {detailOrder ? 
      <div>
        <h2 className="order-title">Chi tiết đơn hàng</h2>
        <div className="order-info">
          <div className="order-info-item">
            <span className="info-item-label">Số đơn hàng:</span>
            <span className="info-item-value">{detailOrder?._id}</span>
          </div>
          <div className="order-info-item">
            <span className="info-item-label">Người đặt:</span>
            <span className="info-item-value">{detailOrder?.customerName}</span>
          </div>
          <div className="order-info-item">
            <span className="info-item-label">Số điện thoại :</span>
            <span className="info-item-value">{detailOrder?.phone}</span>
          </div>
          <div className="order-info-item">
            <span className="info-item-label">Địa chỉ nhận hàng:</span>
            <span className="info-item-value">{detailOrder?.address}</span>
          </div>
          <div className="order-info-item">
            <span className="info-item-label">Ghi chú:</span>
            <span className="info-item-value">{detailOrder?.note}</span>
          </div>
          <div className="order-info-item">
            <span className="info-item-label">Ngày đặt hàng:</span>
            <span className="info-item-value">{outTime}</span>
          </div>
          <div className="order-info-item">
            <span className="info-item-label">Dự kiến ngày nhận: </span>
            <span className="info-item-value">{detailOrder?.DeliveryDate}</span>
          </div>
          <div className="order-info-item">
            <span className="info-item-label">Trạng thái:</span>
            <span className="info-item-value status-shipped">{detailOrder?.status}</span>
          </div>
          <div className="order-info-item">
            <span className="info-item-label">Thanh toán:</span>
            <span className="info-item-value">{(!detailOrder?.pay) ? "Chưa thanh toán" : "Đã thanh toán"}</span>
          </div>
        </div>
        <div className="order-items">
          {detailOrder?.products?.map((item: any) => (
            <div className="order-item">
              <img src={item.productId.image} alt="Product 1" className="product-image" />
              <div className="product-details">
                <h3 className="product-name">{item.productId.name}( {item.sizeId.name} )</h3>
                <p className="product-price">${item.price}</p>
                <p className="product-quantity">Số lượng: {item.quantity}</p>
                <p className="product-total">Tổng cộng: ${item.quantity * item.price}</p>
              </div>
            </div>
          ))}


        </div>
        <div className="order-summary">
          <h3 className="summary-title">Tổng cộng:</h3>
          <p className="summary-amount">${detailOrder?.totalPrice}</p>
        </div>
        {(detailOrder?.status == "Đã hủy" || !remainingTime) ? <Button disabled>Hủy</Button> :
          <div><Button onClick={() => handleCancel(detailOrder?._id)}>Hủy đơn hàng</Button><p>{remainingTime}</p></div>
        }
      </div>
        :<div className='exist' >
        <img src="https://i.pinimg.com/564x/7c/f6/24/7cf6247aa5499759fded5f256ab65a53.jpg" alt="" />
         <h2 >Order does not exist</h2> 
      </div>
}
      </div> 

    </div>
  )
}

export default OrderDetail