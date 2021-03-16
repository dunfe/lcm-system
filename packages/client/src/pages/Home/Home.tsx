import * as React from 'react';
import { Layout, Menu } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import Join from '../../components/Session/Join';
import HeaderComponent from '../../components/Header/Header';
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

const { Sider, Content } = Layout;

export function HomePage() {
  //check login
  const { path } = useRouteMatch();

  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <BrowserRouter>
          <HeaderComponent />
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
              theme={"light"}
            >
              <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                  <Link to={`/`}>Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                  <Link to={`/add`}>Thêm câu hỏi</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                  <Link to={`/questions`}>Danh sách câu hỏi</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<UserOutlined />}>
                  <Link to={`/session`}>Session</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Content style={{ margin: '24px 16px 0' }}>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 360, backgroundColor: "white" }}
                >
                  <Switch>
                    <Route exact path={path}>
                      <h3>Dashboard</h3>
                    </Route>
                    <Route path={`/add`}>
                      <h3>Thêm câu hỏi</h3>
                    </Route>
                    <Route path={`/questions`}>
                      <h3>Danh sách câu hỏi</h3>
                    </Route>
                    <Route path={`/session`}>
                      <Join />
                    </Route>
                  </Switch>
                </div>
              </Content>
            </Layout>
          </Layout>
        </BrowserRouter>
      </Layout>
    </>
  );
}
