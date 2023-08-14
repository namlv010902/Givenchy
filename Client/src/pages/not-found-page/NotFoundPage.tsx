import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div style={{textAlign:"center",height:"500px",marginTop:"150px"}}>
         <h1 style={{color:"#eb0303"}}> 404 - Not Found Page</h1>
      <p>The requested page does not exist.</p>
      <Link to="/" style={{textDecoration:"none",fontSize:"20px"}}>Go back to the homepage</Link>
    </div>
  )
}

export default NotFoundPage