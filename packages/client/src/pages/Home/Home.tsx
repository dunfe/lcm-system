import * as React from 'react';
import { Layout, Menu } from 'antd';
import {
  FileSearchOutlined,
  UserOutlined,
  UnorderedListOutlined,
  AppstoreAddOutlined,
  TeamOutlined
} from '@ant-design/icons';
import Join from '../../components/Session/Join';
import HeaderComponent from '../../components/Header/Header';
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import PageHeader from "../../components/Header/PageHeader";
import AddQuestion from "../Add/AddQuestion";
import ListQuestion from "../Question/ListQuestion";

const { Sider, Content } = Layout;

const {useState, useEffect} = React;

export function HomePage() {
  //check login
  const { path } = useRouteMatch();
  const [selectedKeys, setSelectedKeys] = useState([location.pathname]);
  const [pageHeader, setPageHeader] = useState({
    title: '',
    subtitle: ''
  });

  const onSelect = ({selectedKeys}: any) => {
    setSelectedKeys(selectedKeys)
  };

  useEffect(() => {
    if (selectedKeys) {
      switch (selectedKeys[0]) {
        case '/add':
          setPageHeader({
            title: 'Tạo câu hỏi',
            subtitle: 'Tạo một câu hỏi để được giúp đỡ'
          });
          break;
        case '/questions':
          setPageHeader({
            title: 'Danh sách câu hỏi',
            subtitle: 'Danh sách những câu hỏi của bạn'
          });
          break;
        case '/matching':
          setPageHeader({
            title: 'Matching',
            subtitle: 'Chọn những mentor bạn muốn'
          });
          break;
      }
    }
  }, [selectedKeys]);

  return (
      <Layout style={{ height: '100vh' }}>
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
              <Menu theme="light" mode="inline" selectedKeys={selectedKeys} onSelect={onSelect}>
                <Menu.Item key="/" icon={<UserOutlined />}>
                  <Link to={`/`}>Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="/add" icon={<AppstoreAddOutlined />}>
                  <Link to={`/add`}>Thêm câu hỏi</Link>
                </Menu.Item>
                <Menu.Item key="/questions" icon={<UnorderedListOutlined />}>
                  <Link to={`/questions`}>Danh sách câu hỏi</Link>
                </Menu.Item>
                <Menu.Item key="/matching" icon={<FileSearchOutlined />}>
                  <Link to={`/matching`}>Matching</Link>
                </Menu.Item>
                <Menu.Item key="/session" icon={<TeamOutlined />}>
                  <Link to={`/session`}>Session</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <PageHeader title={pageHeader.title} subTitle={pageHeader.subtitle}/>

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
                      <AddQuestion/>
                    </Route>
                    <Route path={`/questions`}>
                      <ListQuestion/>
                    </Route>
                    <Route path={`/matching`}>
                      <h3>Matching</h3>
                    </Route>
                    <Route path={`/session`}>
                      <Join />
                    </Route>
                  </Switch>
                </div>
              </Content>
            </Layout>
          </Layout>
      </Layout>
  );
}
