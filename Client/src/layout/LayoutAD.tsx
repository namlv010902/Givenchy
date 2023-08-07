import React, { useState ,useEffect} from 'react';
import "../pages/admin/dashbroad/dashBroad.css"
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
interface IProps{
  user:any
}
const LayoutAD = (props:IProps) => {
  console.log(props);
  
    const navigate = useNavigate()
    
    
  //  useEffect(()=>{
  //   if(props?.user?.role !=="admin"){
  //     navigate("/auth/login")
  //      return
  //    }  
  
  //  },[props?.user])
    const { Header, Content, Footer, Sider } = Layout;

    type MenuItem = Required<MenuProps>['items'][number];
    
    function getItem(
      label: React.ReactNode,
      key: React.Key,
      icon?: React.ReactNode,
      children?: MenuItem[],
    ): MenuItem {
      return {
        key,
        icon,
        children,
        label,
      } as MenuItem;
    }
    
    const items: MenuItem[] = [
      getItem('Products', '1', <PieChartOutlined />,[
        getItem('List Product', '3',<Link to="/admin/products"/>),
        getItem('Create product', '4',<Link to="/admin/product/add"/>),
      ]),
      getItem('Option 2', '2', <DesktopOutlined />,[
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
      ]),
      getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
      ]),
      getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
      getItem('Files', '9', <FileOutlined />),
    ];
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    
  return (
    <div>
 <Layout style={{ minHeight: '100vh' }}>
      <Sider  collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical">
          <img src="https://bizweb.dktcdn.net/thumb/large/100/482/001/themes/906081/assets/shop_logo_image.png?1687164764867" alt="" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Outlet></Outlet>
        <Content style={{ margin: '0 16px' }}>
          
        
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
    </div>
  )
}

export default LayoutAD