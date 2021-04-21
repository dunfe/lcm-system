import { Row, Col, Card, Table, Avatar, List } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import * as React from "react";
import "./Dashboard.css";
import { useAPI } from '../../utils/hooks/useAPI'
import { useDispatch, useSelector } from 'react-redux'
import { selectSkills, update } from '../skills/skillsSlice'
import dayjs from 'dayjs'
import { selectMentees } from '../mentees/menteesSlice'

const {Meta} = Card;

interface IDashboard {
    "totalUser": number,
    "totalMentor": number,
    "totalQuestion": number,
    "totalSkill": number
}

const {useEffect, useState} = React

const Dashboard = () => {
    const instance = useAPI()
    const skills = useSelector(selectSkills)
    const mentees = useSelector(selectMentees)
    const dispatch = useDispatch()

    const [total, setTotal] = useState<IDashboard>({
        "totalUser": 0,
        "totalMentor": 0,
        "totalQuestion": 0,
        "totalSkill": 0
    })

    const skillsColumns = [
        {
            title: 'No',
            width: '5%',
            render(text: string, record: any, index: number) {
                return index + 1
            },
        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render(text: string) {
                return dayjs(text).format('LLLL')
            },
        },
    ]

    useEffect(() => {
        instance.get('/api/admin/skills').then((response) => {
            dispatch(update(response.data.skill))
        }).catch((error) => console.error(error.message))

        instance.get('/api/admin/dashboard').then((response) => {
            setTotal(response.data)
        }).catch((error) => console.error(error))
    }, [])

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={6}>
                    <Card title="Số lượng mentee" bordered={false}>
                        {total.totalUser}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Câu hỏi tháng này" bordered={false}>
                        {total.totalQuestion}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Số lượng mentor" bordered={false}>
                        {total.totalMentor}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Số lượng skill" bordered={false}>
                        {total.totalSkill}
                    </Card>
                </Col>
            </Row>
            <Card title="Danh sách kỹ năng" bordered={false} style={{marginTop: 24, marginBottom: 24}}>
                <Table columns={skillsColumns}  dataSource={skills}/>
            </Card>
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
                    dataSource={mentees}
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
