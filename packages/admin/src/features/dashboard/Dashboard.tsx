import { Row, Col, Card, Table, Typography } from 'antd'
import * as React from 'react'
import './Dashboard.css'
import { useAPI } from '../../utils/hooks/useAPI'
import { useDispatch, useSelector } from 'react-redux'
import { selectSkills, updateSkills } from '../skills/skillsSlice'
import dayjs from 'dayjs'
import { selectMentees, updateMentees } from '../mentees/menteesSlice'
import { selectMentors, updateMentors } from '../mentors/mentorsSlice'
import { selectQuestions, updateQuestions } from '../questions/questionsSlice'
import { Line, Pie } from '@antv/g2plot'
import { useCount } from '../../utils/hooks/useCount'
import { useStatus } from '../../utils/hooks/useStatus'
import { useRoleStatus } from '../../utils/hooks/useRoleStatus'

interface IDashboard {
    totalUser: number
    totalMentor: number
    totalQuestion: number
    totalSkill: number
}

const { useEffect, useState } = React
const { Title } = Typography

const Dashboard = () => {
    const instance = useAPI()
    const skills = useSelector(selectSkills)
    const mentees = useSelector(selectMentees)
    const mentors = useSelector(selectMentors)
    const questions = useSelector(selectQuestions)
    const dispatch = useDispatch()

    const [total, setTotal] = useState<IDashboard>({
        totalUser: 0,
        totalMentor: 0,
        totalQuestion: 0,
        totalSkill: 0,
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
        if (questions.length > 0) {
            const _data = useCount(questions)
            const _status = useStatus(questions)

            const line = new Line('questions', {
                data: Object.values(_data),
                xField: 'date',
                yField: 'count',
                height: 100,
                yAxis: {
                    tickCount: 2,
                },
                smooth: true,
            })

            const pie = new Pie('questions-pie', {
                data: Object.values(_status),
                angleField: 'value',
                colorField: 'type',
            })

            pie.render()
            line.render()
        }
    }, [questions])

    useEffect(() => {
        if (mentees.length > 0) {
            const _data = useCount(mentees)
            const _status = useRoleStatus(mentees)

            const line = new Line('mentees', {
                data: Object.values(_data),
                xField: 'date',
                yField: 'count',
                height: 100,
                yAxis: {
                    tickCount: 2,
                },
                smooth: true,
            })

            const pie = new Pie('mentees-pie', {
                data: Object.values(_status),
                angleField: 'value',
                colorField: 'type',
            })

            pie.render()
            line.render()
        }
    }, [mentees])

    useEffect(() => {
        if (mentors.length > 0) {
            const _data = useCount(mentors)
            const _status = useRoleStatus(mentors)

            const line = new Line('mentors', {
                data: Object.values(_data),
                xField: 'date',
                yField: 'count',
                height: 100,
                yAxis: {
                    tickCount: 2,
                },
                smooth: true,
            })
            const pie = new Pie('mentors-pie', {
                data: Object.values(_status),
                angleField: 'value',
                colorField: 'type',
            })

            pie.render()
            line.render()
        }
    }, [mentors])

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
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Số lượng câu hỏi" bordered={false}>
                        <Title level={2}>{total.totalQuestion}</Title>
                        <div id={'questions'} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Số lượng mentor" bordered={false}>
                        <Title level={2}>{total.totalMentor}</Title>
                        <div id={'mentors'} />
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
                        <div id={'questions-pie'} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        title="Danh sách mentor"
                        bordered={false}
                        style={{ marginTop: 24, marginBottom: 24 }}
                    >
                        <div id={'mentors-pie'} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        title="Danh sách mentee"
                        bordered={false}
                        style={{ marginTop: 24, marginBottom: 24 }}
                    >
                        <div id={'mentees-pie'} />
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
