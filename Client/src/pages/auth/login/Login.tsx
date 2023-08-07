import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import './login.css'
import { scrollToTop } from '../../../api/config';

interface IProps{
  handleLogin(data:any):void
}
const Login = (props:IProps) => {

  const onFinish = (values: any) => {
   props.handleLogin(values)
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{margin:"20px 100px"}}>
      <div className="menu-login">
        <Link to="/">Home/</Link>Login
      </div>
      <h3 style={{textAlign:"center",marginTop:"30px"}}>Login</h3>
      <div className="login-btn">
        <img src="https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg" alt="" />
        <img src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg" alt="" />
      </div>
      <div  id='formLogin'>
      <Form
     
         layout="vertical"
   
 
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
   
    
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' ,type:'email'}]}
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

    <Form.Item name="remember" valuePropName="checked" style={{textAlign:"center"}}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item style={{textAlign:"center"}}>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form.Item>
    <Form.Item style={{textAlign:"center"}}>
<Link to="/sendTokenMail"  onClick={()=>scrollToTop()}> Quên mật khẩu?</Link>
     </Form.Item>
    <Form.Item style={{textAlign:"center"}}>
     <p> Bạn chưa có tài khoản?<Link to="/auth/register" onClick={()=>scrollToTop()}> Đăng ký tại đây</Link></p>  
     </Form.Item>
  </Form>
    </div>
    </div>
  )
}

export default Login