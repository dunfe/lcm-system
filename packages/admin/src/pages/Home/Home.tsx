import * as React from 'react';
import { Layout, Menu } from 'antd';
import {DashboardOutlined, FormOutlined, TeamOutlined, CheckCircleOutlined
} from '@ant-design/icons';
import HeaderComponent from '../../components/Header/Header';
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import Skills from "../../components/Manage/Skills";

const { Sider, Content } = Layout;

export function HomePage() {
  //check login
  const { path } = useRouteMatch();

  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <BrowserRouter basename={"/"}>
          <HeaderComponent />
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
              theme="light"
            >
              <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                  <Link to={`/`}>Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FormOutlined />}>
                  <Link to={`/skills`}>Quản lí kỹ năng</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<TeamOutlined />}>
                  <Link to={`/mentees`}>Quản lí Mentee</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<TeamOutlined />}>
                  <Link to={`/mentors`}>Quản lí Mentor</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<CheckCircleOutlined />}>
                  <Link to={`/feedbacks`}>Quản lí Feedback</Link>
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
                    <Route path={`/skills`}>
                      <Skills />
                    </Route>
                    <Route path={`/mentees`}>
                      <h3>Quản lí Mentee</h3>
                    </Route>
                    <Route path={`/mentors`}>
                      <h3>Quản lí Mentor</h3>
                    </Route>
                    <Route path={`/feedbacks`}>
                      <h3>Quản lí Feedback</h3>
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
