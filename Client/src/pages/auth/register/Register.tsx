import { Button, Checkbox, Form, Input ,InputNumber} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { login, register } from '../../../api/auth';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { scrollToTop } from '../../../api/config';

export const Register = () => {
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    console.log('Success:', values);
    register(values).then(()=>{
        navigate("/auth/login")
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast:any) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Đăng ký thành công'
        })
    })
    .catch((error)=>console.log(error) )
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{margin:"20px 100px"}}>
      <div className="menu-login">
        <Link to="/">Home/</Link>Register
      </div>
      <h3 style={{textAlign:"center",marginTop:"30px"}}>Register</h3>
      <div className="login-btn">
        <img src="https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg" alt="" />
        <img src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg" alt="" />
      </div>
      <div id="formLogin">
      <Form
    layout="vertical"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
 
    
  >
      <Form.Item
      label="Username"
      name="name"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input /> 
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' ,type:'email'}]}
    >
      <Input /> 
    </Form.Item>
    <Form.Item
      label="Phone"
      name="phone"
      rules={[{ required: true, message: 'Please input your phone!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
   
    

    <Form.Item style={{textAlign:"center"}} >
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form.Item>
    <Form.Item style={{textAlign:"center"}} >
      <p>Bạn đã có tài khoản?  <Link to="/auth/login"  onClick={()=>scrollToTop()}> Đăng nhập tại đây</Link></p>
   
       
    </Form.Item>
  </Form>
  </div>
    </div>
  )
}
