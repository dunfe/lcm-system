import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout, Menu } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Logo } from './components/Logo';
import { LogoContainer } from './components/LogoContainer';
import Join from '../../components/Session/Join';
import HeaderComponent from '../../components/Header/Header';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

const { Sider, Content } = Layout;

export function HomePage() {
  //check login

  let { path, url } = useRouteMatch();

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="LCM homepage" />
      </Helmet>
      <Layout style={{ height: '100vh' }}>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <LogoContainer className="logo">
              <Logo />
            </LogoContainer>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to={`/app`}>Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to={`${url}/add`}>Thêm câu hỏi</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                <Link to={`${url}/questions`}>Danh sách câu hỏi</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<UserOutlined />}>
                <Link to={`/session`}>Session</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <HeaderComponent />
            <Content style={{ margin: '24px 16px 0' }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Switch>
                  <Route exact path={path}>
                    <h3>Dashboard</h3>
                  </Route>
                  <Route path={`${path}/add`}>
                    <h3>Thêm câu hỏi</h3>
                  </Route>
                  <Route path={`${path}/questions`}>
                    <h3>Danh sách câu hỏi</h3>
                  </Route>
                  <Route path={`${path}/session`}>
                    <Join />
                  </Route>
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
