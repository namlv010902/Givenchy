import { useState } from "react"
import { verifyTokenMailer } from "../../../api/users"
import { useNavigate } from "react-router-dom"

const VerifyTokenMail = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState("")
    const [isValidToken, setIsValidToken] = useState(true)
    const handleSubmit=(e:any)=>{
    e.preventDefault()
     if(token){
        verifyTokenMailer(token).then(({data})=>{
            console.log(data)
            localStorage.setItem("emailToken",JSON.stringify(data.AccessToken));
            navigate("/forgotPassword")
        })
        .catch(({response})=>console.log(response.data.message))
     }
     
    }
    const handleChangeToken=(e:any)=>{
        const value = e.target.value
        setToken(value);
        handleBlurToken(value)
        
    }
    const handleBlurToken=(value:any)=>{
        if(value.length > 0){
            setIsValidToken(true)
        }else{
            setIsValidToken(false);
        }
        
    }
  return (
    <div>VerifyTokenMail
       
        <form id="sendMail" action="" onSubmit={handleSubmit}>
            <input type="text"  id="" onChange={e=>handleChangeToken(e)} onBlur={()=>handleBlurToken(token)}  />
            <p style={{color:"red"}}>{!isValidToken ? "Nhập token đi..." :""}</p>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default VerifyTokenMail