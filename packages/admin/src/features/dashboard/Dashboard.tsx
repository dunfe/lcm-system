import {Row, Col, Card} from "antd";
import * as React from "react";
import "./Dashboard.css"

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
        </div>
    )
};

export default Dashboard;
