import { Card, Avatar, Row, Col } from 'antd';
import "./Profile.css"
import {useState, useEffect} from "react"
import { Button, Checkbox, Form, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import axios from 'axios';


interface IProps{
  handleUpdateProfile(data:any,callback:()=>void):void;
  user:any
}
const Profile = (props:IProps) => {
  const [profile, setProfile] = useState(false)
  const { Meta } = Card;
  // console.log(props.user);
  const avatar=props?.user?.avatar
  const [showAvatar, setShowAvatar] = useState()
  useEffect(()=>{
    setShowAvatar(avatar)
  },[avatar])
  const onFinish = async(values: any) => {
    values["avatar"] = showAvatar
 await props.handleUpdateProfile(values,()=>{
  setProfile(false)
 })
  


  };
  
  const [fileList, setFileList] = useState<UploadFile[]>([
    
  ]);

 

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const handleUpload = (fileList:any) => {
   
    const formData = new FormData();
    fileList.forEach((file:any) => {
      formData.append('image', file);
    });
  
    axios.post('http://localhost:8080/api/upload', formData)
      .then((response) => {
        console.log(response.data.data[0].url);
        setShowAvatar(response.data.data[0].url)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
 
  // console.log(showAvatar);
  
  const showProfile=(
    <Row justify="center">
    <Col span={8}>
      <Card>
        <Meta
          avatar={
            <Avatar className='avatar' src={showAvatar} />
          }
          title={props?.user?.name}
          description="Web Developer"
        />
        <h3>About Me:</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt ultrices risus eu gravida.</p>
        <h3>Contact Information:</h3>
        <ul>
          <li>Email: {props?.user?.email}</li>
          <li>Phone: {props?.user?.phone}</li>
        </ul>
        <Button onClick={()=>setProfile(true)}>Edit profile</Button>
      </Card>
   
    </Col>
    
  </Row>
  )
  const editProfile=(
    <div>
       <Row justify="center">
       
       <Col span={8}>
         <Card>
        
           <Meta
             avatar={
               <Avatar className='avatar' src={showAvatar} />
             }
             title={props?.user?.name}
             description="Web Developer"
           />
            <ImgCrop rotationSlider  >
  <Upload
   className='upload-avatar'
    fileList={fileList}
    onChange={({ fileList }) => handleUpload(fileList)}
   
    onPreview={onPreview}
  >
    {fileList.length < 1 && 'Tải ảnh lên'}
  </Upload>
</ImgCrop>
           <h3>About Me:</h3>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt ultrices risus eu gravida.</p>
           <h3>Contact Information:</h3>
           <Form
    name="basic"

    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="name"
      rules={[{ required: true, message: 'Please input your username!' }]}
      initialValue={props?.user?.name}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!',type:"email" }]}
      initialValue={props?.user?.email}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Phone"
      name="phone"
      rules={[{ required: true, message: 'Please input your phone!' }]}
      initialValue={props?.user?.phone}
    >
      <Input />
    </Form.Item>

  

    <Form.Item >
      <Button type="primary" htmlType="submit" >Save</Button>

    </Form.Item>
  </Form>
         </Card>
      
       </Col>
       
     </Row>
    </div>
  )
  
  
  return (
    <div className="profile-main">
      <ToastContainer></ToastContainer>
       <h1>Your profile</h1>
       <div>
   
       </div>

    {/* : <Button>Save</Button>} */}
      {!profile ? showProfile : editProfile}
    </div>
  );
};

export default Profile
