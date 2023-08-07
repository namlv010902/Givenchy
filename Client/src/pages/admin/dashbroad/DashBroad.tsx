import React, { useState } from 'react';
import "./dashBroad.css"
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const DashBroad = () => {
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
      getItem('Option 1', '1', <PieChartOutlined />),
      getItem('Option 2', '2', <DesktopOutlined />),
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
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical">
          <img src="https://bizweb.dktcdn.net/thumb/large/100/482/001/themes/906081/assets/shop_logo_image.png?1687164764867" alt="" />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          
          <div >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
    </div>
  )
}

export default DashBroad