
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const ChangePassword = () => {
  return (
    <div>
<div className="mail-main">
    <h2 style={{position:"absolute",left:"100px",top:"100px"}}>Change password</h2>
    <form id="sendMail" > <ToastContainer></ToastContainer>
    <p id="msg_token">Reset the password for your account</p>
      <div className="formItem" style={{marginLeft:"25px"}}>
        <label htmlFor="">Enter your new password: </label><br />
        <input type="password" id="password" />
       
        <label htmlFor="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword"
        //  onBlur={() => handleBlurConfirmPassword(confirmPassword)}
        //  onChange={e => handleChangeConfirmPassword(e)}
      />
        {/* {!comparePassword ? <p style={{ color: "red" }}>{errConfirmPassword ? "This is required" : ""}</p> : <p style={{ color: "red" }}>{comparePassword ? "ConfirmPassword don't match password" : ""}</p>}         */}
        <button>
          SAVE
        </button>
        <p> <Link to="/profile">CANCEL</Link></p>
      </div>
    </form>
    <div className="mail-img">
      <img src="https://keva-store-demo.myshopify.com/cdn/shop/files/instagram4.jpg?v=11928946692611708284" alt="" />
    </div>
  </div>
    </div>
  )
}

export default ChangePassword