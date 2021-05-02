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
import { Line, Pie } from '@ant-design/charts'
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
    const [questionData, setQuestionData] = useState<Record<string, any>[]>([])
    const [questionStatusData, setQuestionStatusData] = useState<
        Record<string, any>[]
    >([])
    const [menteesData, setMenteesData] = useState<Record<string, any>[]>([])
    const [menteesStatusData, setMenteesStatusData] = useState<
        Record<string, any>[]
    >([])
    const [mentorsData, setMentorsData] = useState<Record<string, any>[]>([])
    const [mentorsStatusData, setMentorsStatusData] = useState<
        Record<string, any>[]
    >([])

    const questionsConfig = {
        data: questionData,
        xField: 'date',
        yField: 'count',
        height: 100,
        yAxis: {
            tickCount: 2,
        },
        smooth: true,
    }

    const menteesConfig = {
        data: menteesData,
        xField: 'date',
        yField: 'count',
        height: 100,
        yAxis: {
            tickCount: 2,
        },
        smooth: true,
    }

    const questionsPieConfig = {
        data: questionStatusData,
        angleField: 'value',
        colorField: 'type',
    }

    const menteesPie = {
        data: menteesStatusData,
        angleField: 'value',
        colorField: 'type',
    }

    const mentorsConfig = {
        data: mentorsData,
        xField: 'date',
        yField: 'count',
        height: 100,
        yAxis: {
            tickCount: 2,
        },
        smooth: true,
    }

    const mentorsPie = {
        data: mentorsStatusData,
        angleField: 'value',
        colorField: 'type',
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
        if (questions.length > 0) {
            const _data = useCount(questions)
            const _status = useStatus(questions)
            setQuestionData(Object.values(_data))
            setQuestionStatusData(Object.values(_status))
        }
    }, [questions])

    useEffect(() => {
        if (mentees.length > 0) {
            const _data = useCount(mentees)
            const _status = useRoleStatus(mentees)

            setMenteesData(Object.values(_data))
            setMenteesStatusData(Object.values(_status))
        }
    }, [mentees])

    useEffect(() => {
        if (mentors.length > 0) {
            const _data = useCount(mentors)
            const _status = useRoleStatus(mentors)
            setMentorsData(Object.values(_data))
            setMentorsStatusData(Object.values(_status))
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
