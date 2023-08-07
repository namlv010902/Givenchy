import { Button } from "antd"
import { Link } from "react-router-dom"
import './succesMessage.css'
const SuccessMessage = () => {
  return (
    <div>
      <div className="message-main">
    <h1>Đặt hàng thành công!</h1>
    <p>Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được ghi nhận và đang được xử lý.</p>
    <p>Mã đơn hàng: 123456789</p>
    <Button ><Link to="/order" >Kiểm tra đơn hàng</Link></Button>
  </div>
    </div>
  )
}

export default SuccessMessage