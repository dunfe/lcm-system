import * as React from 'react';
import { Card, Layout, Tabs } from 'antd';
import styled from 'styled-components';
import './Session.css';
import Join from '../../components/Session/Join';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

const SessionPage = () => {
  return (
    <Layout className="session-layout">
      <Content
        style={{
          marginTop: 20,
          marginLeft: 20,
          marginBottom: 20,
          height: 'calc(100vh - 40px)',
          backgroundColor: 'white',
        }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Real-time Collaboration Editor" key="1">
            <TabContent>IDE</TabContent>
          </TabPane>
          <TabPane tab="Video/Audio Call" key="2">
            <TabContent>
              <Join />
            </TabContent>
          </TabPane>
          <TabPane tab="Screen Share" key="3">
            <TabContent>Screen Share</TabContent>
          </TabPane>
        </Tabs>
      </Content>
      <Sider width={342} className={'session-sider'} theme={'light'}>
        <Card
          className={'session-time'}
          title="Session"
          bordered={false}
          style={{ width: 302, height: 182, margin: 'auto', marginTop: 20 }}
        >
          Time
        </Card>
        <Card
          className={'session-chat'}
          title="Trò chuyện"
          bordered={false}
          style={{
            width: 302,
            margin: 'auto',
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Chat
        </Card>
      </Sider>
    </Layout>
  );
};

const TabContent = styled.div`
  background-color: white;
  height: 100%;
`;

export default SessionPage;
