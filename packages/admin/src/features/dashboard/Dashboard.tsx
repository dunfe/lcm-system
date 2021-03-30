import {Row, Col, Card, Table, Avatar, List} from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import * as React from "react";
import "./Dashboard.css";

const {Meta} = Card;

const Dashboard = () => {
    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={6}>
                    <Card title="Số lượng mentee" bordered={false}>
                        Card content
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Câu hỏi tháng này" bordered={false}>
                        Card content
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Số lượng mentor" bordered={false}>
                        Card content
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Số lượng skill" bordered={false}>
                        Card content
                    </Card>
                </Col>
            </Row>
            <Card title="Danh sách câu hỏi" bordered={false} style={{marginTop: 24, marginBottom: 24}}>
                <Table  dataSource={[]}/>
            </Card>
            <Card title="Danh sách mentor" bordered={false} style={{marginTop: 24, marginBottom: 24}}>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={[]}
                    renderItem={() => (
                        <List.Item>
                            <Card
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            </Card>
            <Card title="Danh sách mentee" bordered={false} style={{marginTop: 24, marginBottom: 24}}>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={[]}
                    renderItem={() => (
                        <List.Item>
                            <Card
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    )
};

export default Dashboard;
