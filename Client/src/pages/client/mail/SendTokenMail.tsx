import {useState} from "react"
import { sendMailer } from "../../../api/users"
import { useNavigate } from "react-router-dom"
import "./mail.css"
const SendTokenMail = () => {
   const [email, setEmail] = useState("")
   const [errEmail, setErrEmail] = useState(false)
   const navigate = useNavigate()
   const handleChange=(e:any) => {
    const value = e.target.value
   console.log(value);
   setEmail(value)
   handleBlur(value)
 
   }
   const handleBlur=(value:string)=>{
    if(value.length <=0){
        setErrEmail(true)
       }else{
        setErrEmail(false)
       }
   }
  const sendMail=(e:any)=>{
    e.preventDefault();
   if(email){
   sendMailer(email).then(({data})=>{
    console.log(data) 
    navigate("/verifyTokenMail")
   })
   .catch(({response})=>console.log(response.data.message) );
   }
  }
  console.log(errEmail);
  
  return (
    <div>SendTokenMail
     <form id="sendMail" onSubmit={sendMail}>
        <label htmlFor="">Nhập email của bạn: </label>
        <input type="email" name="email" id="" placeholder="Nhập email của bạn" onBlur={()=>handleBlur(email)} onChange={e=>handleChange(e)} />
       <p style={{color:"red"}}>{errEmail ? "Ko được bỏ trống! " : ""} </p>
     
      <button>Send</button>
     </form>


    </div>
  )
}

export default SendTokenMail