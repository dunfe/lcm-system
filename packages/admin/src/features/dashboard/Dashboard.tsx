import { Row, Col, Card, Table, Tag } from 'antd'
import * as React from "react";
import "./Dashboard.css";
import { useAPI } from '../../utils/hooks/useAPI'
import { useDispatch, useSelector } from 'react-redux'
import { selectSkills, updateSkills } from '../skills/skillsSlice'
import dayjs from 'dayjs'
import { selectMentees, updateMentees } from '../mentees/menteesSlice'
import { selectMentors, updateMentors } from '../mentors/mentorsSlice'
import { selectQuestions } from '../questions/questionsSlice'
import { status } from '../../utils/status'

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
    const mentors = useSelector(selectMentors)
    const questions = useSelector(selectQuestions)
    const dispatch = useDispatch()

    const [total, setTotal] = useState<IDashboard>({
        "totalUser": 0,
        "totalMentor": 0,
        "totalQuestion": 0,
        "totalSkill": 0
    })

    const questionsColumns = [
        {
            title: 'No',
            width: '5%',
            render(text: string, record: any, index: number) {
                return index + 1
            },
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: string, record: any) => {
                return status.map((item) => {
                    if (item.value === record.status) {
                        return (
                            <Tag color={item.color} key={record._id}>
                                {record.status}
                            </Tag>
                        )
                    }
                })
            },
        }
    ]

    const menteesColumns = [
        {
            title: 'No',
            width: '5%',
            render(text: string, record: any, index: number) {
                return index + 1
            },
        },
        {
            title: 'Tên',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render(text: string) {
                return (
                  <Tag color={text === 'banned' ? 'red': 'green'}>
                      {text}
                  </Tag>
                )
            }
        },
    ]
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
        instance.get(`/api/admin/mentors`).then((response) => {
            dispatch(updateMentors(response.data.results));
        }).catch((error) => console.error(error.message))

        instance.get(`/api/admin/users`).then((response) => {
            dispatch(updateMentees(response.data.results))
        }).catch((error) => console.error(error.message))

        instance.get('/api/admin/skills').then((response) => {
            dispatch(updateSkills(response.data.skill))
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
                <Table columns={questionsColumns}  dataSource={questions}/>
            </Card>
            <Card title="Danh sách mentor" bordered={false} style={{marginTop: 24, marginBottom: 24}}>
                <Table columns={menteesColumns}  dataSource={mentors}/>
            </Card>
            <Card title="Danh sách mentee" bordered={false} style={{marginTop: 24, marginBottom: 24}}>
                <Table columns={menteesColumns}  dataSource={mentees}/>
            </Card>
        </div>
    )
};

export default Dashboard;
