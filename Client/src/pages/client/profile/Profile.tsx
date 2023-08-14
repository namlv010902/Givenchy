import { Card, Avatar, Row, Col } from 'antd';
import "./Profile.css"
import { useState, useEffect } from "react"
import { Button, Form, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { UploadFile } from 'antd/es/upload/interface';
import axios from 'axios';
import { useStoreUser } from '../../../store/hooks';
import { getUser, updateProfile } from '../../../service/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../../service/config.service';

const Profile = () => {
  const [profile, setProfile] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user, dispatchUser } = useStoreUser()
  
  const navigate = useNavigate()
  const userId = JSON.parse(localStorage.getItem('userId')!);
  // console.log(userId);
  useEffect(() => {
    if (!userId) {
      navigate("/auth/login")
    }
  }, [])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUser(userId)
        dispatchUser({
          type: "GET_PROFILE",
          payload: data.user
        })
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    }
    fetchUser()
  }, [])
  const { Meta } = Card;
  // console.log(props.user);
  const avatar = user?.avatar
  const [showAvatar, setShowAvatar] = useState()
  useEffect(() => {
    setShowAvatar(avatar)
  }, [avatar])
  const onFinish = async (values: any) => {
    values["avatar"] = showAvatar
    values["userId"] = userId
    console.log(values);

    updateProfile(values).then(() => {
      dispatchUser({
        type: 'UPDATE_PROFILE',
        payload: values
      })
      setProfile(false)
      toast.success('Profile updated successfully')
    })
    .catch(({response})=>toast.error(response.data.message))
  };
  const [fileList] = useState<UploadFile[]>([]);

  const handleUpload = (fileList: any) => {
    setLoading(true)
    console.log(fileList);
    const formData = new FormData();
    for (const file of fileList) {
      formData.append('image', file.originFileObj);
   }
    console.log(formData);
    axios.post('http://localhost:8080/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        setLoading(false)
        // console.log(response.data.data[0].url);
        setShowAvatar(response.data.data[0].url)
      })
      .catch((error) => {
        console.log(error);
      });
     
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
   console.log(loading);
  const showProfile = (
    <Row justify="center">
      <Col span={8}>
        <Card>
          <Meta
            avatar={
              <Avatar className='avatar' src={showAvatar} />
            }
            title={user?.name}
            description="Web Developer"
          />
          <h3>About Me:</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt ultrices risus eu gravida.</p>
          <h3>Contact Information:</h3>
          <ul>
            <li>Email: {user?.email}</li>
            <li>Phone: {user?.phone}</li>
          </ul>
          <Button className='ant-btn css-dev-only-do-not-override-12upa3x ant-btn-primary' onClick={() => setProfile(true)}>Edit profile</Button>
          <Link style={{marginLeft:"20px",backgroundColor:"#3a8d9e",color:"#fff", borderRadius:"6px",padding:"6px 15px"}}   onClick={()=>scrollToTop()} to="/changePassword" >Change password</Link>
        </Card>
      </Col>
    </Row>
  )


  const editProfile = (
    <div>
      <Row justify="center">
        <Col span={8}>
          <Card>
            <Meta
              avatar={
                <Avatar className='avatar' src={showAvatar} />
              }
              title={user?.name}
              description="Web Developer"
            />
             {loading && <img id='loadingAvatar' src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700" alt="" />
        }
            <ImgCrop rotationSlider  >
              <Upload
                className='upload-avatar'
                fileList={fileList}
                onChange={({ fileList }) => handleUpload(fileList)}
               
              >
                {fileList.length < 1 && 'Upload image'}
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
                initialValue={user?.name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!', type: "email" }]}
                initialValue={user?.email}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}
                initialValue={user?.phone}
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

      {!profile ? showProfile : editProfile}
    </div>
  );
};

export default Profile
