import { Row, Col, Card, Table, Typography } from 'antd'
import * as React from 'react'
import './Dashboard.css'
import { useAPI } from '../../utils/hooks/useAPI'
import { useDispatch, useSelector } from 'react-redux'
import { selectSkills, updateSkills } from '../skills/skillsSlice'
import dayjs from 'dayjs'
import { updateMentees } from '../mentees/menteesSlice'
import { updateMentors } from '../mentors/mentorsSlice'
import { updateQuestions } from '../questions/questionsSlice'
import { Line, Pie } from '@ant-design/charts'

interface IStatusCount {
    status: string
    count: number
}

interface IDateCount {
    date: string
    count: number
}

interface IDashboard {
    totalUser: number
    totalMentor: number
    totalQuestion: number
    totalSkill: number
    lineTableMentee: IDateCount[]
    lineTableMentor: IDateCount[]
    lineTableQuestion: IDateCount[]
    circleQuestion: IStatusCount[]
    circleMentee: IStatusCount[]
}

const { useEffect, useState } = React
const { Title } = Typography

const Dashboard = () => {
    const instance = useAPI()
    const skills = useSelector(selectSkills)
    const dispatch = useDispatch()

    const [total, setTotal] = useState<IDashboard>({
        totalUser: 0,
        totalMentor: 0,
        totalQuestion: 0,
        totalSkill: 0,
        lineTableMentee: [],
        lineTableMentor: [],
        lineTableQuestion: [],
        circleQuestion: [],
        circleMentee: [],
    })

    const questionsConfig = {
        data: total.lineTableQuestion,
        xField: 'date',
        yField: 'count',
        height: 100,
        yAxis: {
            tickCount: 2,
        },
        smooth: true,
    }

    const menteesConfig = {
        data: total.lineTableMentee,
        xField: 'date',
        yField: 'count',
        height: 100,
        yAxis: {
            tickCount: 2,
        },
        smooth: true,
    }

    const questionsPieConfig = {
        data: total.circleQuestion,
        angleField: 'count',
        colorField: 'status',
    }

    const menteesPie = {
        data: total.circleMentee,
        angleField: 'count',
        colorField: 'status',
    }

    const mentorsConfig = {
        data: total.lineTableMentor,
        xField: 'date',
        yField: 'count',
        height: 100,
        yAxis: {
            tickCount: 2,
        },
        smooth: true,
    }

    const mentorsPie = {
        data: total.lineTableMentor,
        angleField: 'count',
        colorField: 'date',
    }

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
        instance
            .get(`/api/admin/questions`)
            .then((response) => {
                dispatch(updateQuestions(response.data.results))
            })
            .catch((error) => console.error(error.message))

        instance
            .get(`/api/admin/mentors`)
            .then((response) => {
                dispatch(updateMentors(response.data.results))
            })
            .catch((error) => console.error(error.message))

        instance
            .get(`/api/admin/users`)
            .then((response) => {
                dispatch(updateMentees(response.data.results))
            })
            .catch((error) => console.error(error.message))

        instance
            .get('/api/admin/skills')
            .then((response) => {
                dispatch(updateSkills(response.data.skill))
            })
            .catch((error) => console.error(error.message))

        instance
            .get('/api/admin/dashboard')
            .then((response) => {
                setTotal(response.data)
            })
            .catch((error) => console.error(error))
    }, [])

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={6}>
                    <Card title="Số lượng mentee" bordered={false}>
                        <Title level={2}>{total.totalUser}</Title>
                        <div id={'mentees'} />
                        <Line {...menteesConfig} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Số lượng câu hỏi" bordered={false}>
                        <Title level={2}>{total.totalQuestion}</Title>
                        <Line {...questionsConfig} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Số lượng mentor" bordered={false}>
                        <Title level={2}>{total.totalMentor}</Title>
                        <Line {...mentorsConfig} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Số lượng skill" bordered={false}>
                        <Title level={2}>{total.totalSkill}</Title>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    <Card
                        title="Danh sách câu hỏi"
                        bordered={false}
                        style={{ marginTop: 24, marginBottom: 24 }}
                    >
                        <Pie {...questionsPieConfig} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        title="Danh sách mentor"
                        bordered={false}
                        style={{ marginTop: 24, marginBottom: 24 }}
                    >
                        <Pie {...mentorsPie} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        title="Danh sách mentee"
                        bordered={false}
                        style={{ marginTop: 24, marginBottom: 24 }}
                    >
                        <Pie {...menteesPie} />
                    </Card>
                </Col>
            </Row>
            <Card
                title="Danh sách kỹ năng"
                bordered={false}
                style={{ marginTop: 24, marginBottom: 24 }}
            >
                <Table columns={skillsColumns} dataSource={skills} />
            </Card>
        </div>
    )
}

export default Dashboard
