import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div style={{textAlign:"center",height:"500px",marginTop:"30px"}}>
         <h1 style={{color:"#eb0303"}}> 404 - Page Not Found</h1>
      <p>The requested page does not exist.</p>
      <Link to="/" style={{textDecoration:"none",fontSize:"20px"}}>Trở về trang chủ</Link>
    </div>
  )
}

export default NotFoundPage