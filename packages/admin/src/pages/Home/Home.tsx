import * as React from 'react'
import { Layout, Menu } from 'antd'
import {
    DashboardOutlined,
    FormOutlined,
    TeamOutlined,
    CheckCircleOutlined,
    DollarCircleOutlined,
} from '@ant-design/icons'
import HeaderComponent from '../../components/Header/Header'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import HomeContent from '../../components/Home/Content'
import PageHeaderComponent from '../../components/Header/PageHeader'
import axios from 'axios'
import { useToken } from '../../utils/hooks/useToken'
import { useRole } from '../../utils/hooks/useRole'
import { InAppLogo } from 'common'

const { Sider } = Layout
const { useState, useEffect } = React

export function HomePage() {
    //check login
    const { path } = useRouteMatch()
    const history = useHistory()

    const [selectedKeys, setSelectedKeys] = useState([location.pathname])
    const [pageHeader, setPageHeader] = useState({
        title: '',
        subtitle: '',
    })
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [collapsed, setCollapsed] = useState(false)

    const token = useToken()
    const role = useRole()

    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            Authorization: token,
        },
    })

    const onSelect = ({ selectedKeys }: any) => {
        setSelectedKeys(selectedKeys)
    }

    const onAdd = (values: any) => {
        return instance.post('/api/admin/skills', values)
    }

    const HomeContentProps = {
        path,
        addModalVisible,
        onAdd,
        setAddModalVisible,
    }

    useEffect(() => {
        if (selectedKeys) {
            switch (selectedKeys[0]) {
                case '/skills':
                    setPageHeader({
                        title: 'Quản lý kỹ năng',
                        subtitle: 'Thêm sửa xoá các loại kỹ năng',
                    })
                    break
                case '/questions':
                    setPageHeader({
                        title: 'Quản lý câu hỏi',
                        subtitle: '',
                    })
                    break
                case '/mentees':
                    setPageHeader({
                        title: 'Quản lý Mentee',
                        subtitle: '',
                    })
                    break
                case '/mentors':
                    setPageHeader({
                        title: 'Quản lý Mentor',
                        subtitle: '',
                    })
                    break
                case '/points':
                    setPageHeader({
                        title: 'Quản lý Point',
                        subtitle: '',
                    })
                    break
                case '/requests':
                    setPageHeader({
                        title: 'Quản lý yêu cầu trở thành mentor',
                        subtitle: '',
                    })
                    break
                case '/feedbacks':
                    setPageHeader({
                        title: 'Quản lý feedback',
                        subtitle: 'Giải quyết các feedback',
                    })
                    break
            }
        }
    }, [selectedKeys])

    useEffect(() => {
        if (role === 'staff') {
            setSelectedKeys(['/requests'])
            history.push('/requests')
        }
    }, [])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(collapsed) => {
                        setCollapsed(collapsed)
                    }}
                    theme="dark"
                >
                    <InAppLogo collapsed={collapsed} />
                    <Menu
                        theme="dark"
                        mode="inline"
                        onSelect={onSelect}
                        selectedKeys={selectedKeys}
                    >
                        {role === 'admin' ? (
                            <Menu.Item key="/" icon={<DashboardOutlined />}>
                                <Link to={`/`}>Dashboard</Link>
                            </Menu.Item>
                        ) : null}

                        <Menu.Item key="/requests" icon={<FormOutlined />}>
                            <Link to={`/requests`}>Quản lý yêu cầu</Link>
                        </Menu.Item>
                        {role === 'admin' ? (
                            <>
                                <Menu.Item
                                    key="/skills"
                                    icon={<FormOutlined />}
                                >
                                    <Link to={`/skills`}>Quản lý kỹ năng</Link>
                                </Menu.Item>
                                <Menu.Item
                                    key="/questions"
                                    icon={<FormOutlined />}
                                >
                                    <Link to={`/questions`}>
                                        Quản lý câu hỏi
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    key="/mentees"
                                    icon={<TeamOutlined />}
                                >
                                    <Link to={`/mentees`}>Quản lý Mentee</Link>
                                </Menu.Item>
                                <Menu.Item
                                    key="/mentors"
                                    icon={<TeamOutlined />}
                                >
                                    <Link to={`/mentors`}>Quản lý Mentor</Link>
                                </Menu.Item>
                            </>
                        ) : (
                            <Menu.Item
                                key="/points"
                                icon={<DollarCircleOutlined />}
                            >
                                <Link to={`/points`}>Quản lý Point</Link>
                            </Menu.Item>
                        )}

                        <Menu.Item
                            key="/feedbacks"
                            icon={<CheckCircleOutlined />}
                        >
                            <Link to={`/feedbacks`}>Quản lý Feedback</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <HeaderComponent />
                    {selectedKeys[0] !== '/' ? (
                        <PageHeaderComponent
                            title={pageHeader.title}
                            subTitle={pageHeader.subtitle}
                            onAdd={setAddModalVisible}
                        />
                    ) : null}
                    <HomeContent {...HomeContentProps} />
                </Layout>
            </Layout>
        </Layout>
    )
}
