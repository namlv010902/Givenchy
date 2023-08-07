import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { forgotPassword } from "../../../api/users"
const ForgotPassword = () => {
    const navigate = useNavigate()
    const [newPassword, setNewPassword] = useState("")
    const [errNewPassword, setErrNewPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errConfirmPassword, setErrConfirmPassword] = useState(false)
    const [comparePassword, setComparePassword] = useState(false)
    //async
    useEffect(() => {
        if (newPassword === confirmPassword) {
          setComparePassword(false);
        } else {
          setComparePassword(true);
        }
      }, [ confirmPassword]);
      
    const handleSubmit=(e:any)=>{
     e.preventDefault()
      // hợp lệ tất cả các trường
      if(!newPassword){
        setErrNewPassword(true)
      } 
      if(!confirmPassword){
        setErrConfirmPassword(true)
      }
    if(newPassword && confirmPassword && newPassword === confirmPassword ){
        // alert("oki")
        const data={newPassword, confirmPassword}
        forgotPassword(data).then(({data})=>{
            console.log(data)
            navigate("/auth/login")
        })
        .catch(({response})=>console.log(response.data.message))
    }
    
    }
    console.log(comparePassword);
    
    const handleChangeNewPassword=(e:any)=>{
        const value = e.target.value
        setNewPassword(value);
        handleBlurNewPassword(value)
        
    }
    const handleBlurNewPassword=(value:any)=>{
        if(value.length > 0){
            setErrNewPassword(false)
        }else{
            setErrNewPassword(true);
        }    
    }

    const handleChangeConfirmPassword=(e:any)=>{
        const value = e.target.value
        setConfirmPassword(value);
        handleBlurConfirmPassword(value)   
    }
    const handleBlurConfirmPassword=(value:any)=>{
        if(value.length > 0){
            setErrConfirmPassword(false)
        }else{
            setErrConfirmPassword(true);
        }    
        // if(newPassword !== confirmPassword){
        //     setComparePassword(true)
            
        // }
    }
  return (
    <div>
        <h1>Chọn mật khẩu mới</h1>
        <p>Tạo mật khẩu mới có tối thiểu 6 ký tự.  <br />
          Mật khẩu mạnh là mật khẩu được kết hợp từ các ký tự, số và dấu câu.</p>
        <form onSubmit={handleSubmit}>
  <label htmlFor="password">Password:</label>
  <input type="password" id="password" onBlur={()=>handleBlurNewPassword(newPassword)} 
   onChange={e=>handleChangeNewPassword(e)} />
   <p style={{color:"red"}}>{errNewPassword ? "Nhập mật khẩu mới" :""}</p>
  <br/>
  <label htmlFor="confirmPassword">Confirm Password:</label>
  <input type="password" id="confirmPassword"
  onBlur={()=>handleBlurConfirmPassword(confirmPassword)} 
  onChange={e=>handleChangeConfirmPassword(e)}
  />
  <br/>
  {!comparePassword ?  <p style={{color:"red"}}>{errConfirmPassword ? "Xác nhận mật khẩu mới" :""}</p> : <p style={{color:"red"}}>{comparePassword ? "Xác nhận mật khẩu mới ko trùng " :""}</p> }
 
  
 <button type="submit">Submit</button>
</form>

    </div>
  )
}

export default ForgotPassword