import * as React from 'react';
import {Layout, Menu} from 'antd';
import {
    DashboardOutlined, FormOutlined, TeamOutlined, CheckCircleOutlined
} from '@ant-design/icons';
import HeaderComponent from '../../components/Header/Header';
import {
    Link, useRouteMatch,
} from 'react-router-dom';
import HomeContent from "../../components/Home/Content";
import PageHeaderComponent from "../../components/Header/PageHeader";
import {LogoContainer} from "../../components/Logo/LogoContainer";
import {Logo} from "../../components/Logo/Logo";
import axios from "axios";
import {useAuth} from "../../utils/hooks/useAuth";

const {Sider} = Layout;
const {useState, useEffect} = React;

export function HomePage() {
    //check login
    const {path} = useRouteMatch();
    const [selectedKeys, setSelectedKeys] = useState([location.pathname]);
    const [pageHeader, setPageHeader] = useState({
        title: '',
        subtitle: ''
    });
    const [addModalVisible, setAddModalVisible] = useState(false);
    const auth = useAuth();
    const instance = axios.create({
        baseURL: 'https://livecoding.me',
        headers: {
            'Authorization': auth?.user?.user.token,
        }
    })

    const onSelect = ({selectedKeys}: any) => {
        setSelectedKeys(selectedKeys)
    };

    const onAdd = (values: any) => {
        return instance.post('/api/admin/skills', values);
    }

    const HomeContentProps = {
        path,
        addModalVisible,
        onAdd,
        setAddModalVisible
    }

    useEffect(() => {
        if (selectedKeys) {
            switch (selectedKeys[0]) {
                case '/skills':
                    setPageHeader({
                        title: 'Quản lý kỹ năng',
                        subtitle: 'Thêm sửa xoá các loại kỹ năng'
                    });
                    break;
                case '/questions':
                    setPageHeader({
                        title: 'Quản lý câu hỏi',
                        subtitle: ''
                    });
                    break;
                case '/mentees':
                    setPageHeader({
                        title: 'Quản lý Mentee',
                        subtitle: ''
                    });
                    break;
                case '/mentors':
                    setPageHeader({
                        title: 'Quản lý Mentor',
                        subtitle: ''
                    });
                    break;
                case '/feedbacks':
                    setPageHeader({
                        title: 'Quản lý feedback',
                        subtitle: 'Giải quyết các feedback'
                    });
                    break;
            }
        }
    }, [selectedKeys]);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    theme="dark"
                >
                    <LogoContainer className="logo">
                        <Logo />
                    </LogoContainer>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onSelect={onSelect} selectedKeys={selectedKeys}>
                        <Menu.Item key="/" icon={<DashboardOutlined/>}>
                            <Link to={`/`}>Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item key="/requests" icon={<FormOutlined/>}>
                            <Link to={`/requests`}>Quản lí yêu cầu</Link>
                        </Menu.Item>
                        <Menu.Item key="/skills" icon={<FormOutlined/>}>
                            <Link to={`/skills`}>Quản lí kỹ năng</Link>
                        </Menu.Item>
                        <Menu.Item key="/questions" icon={<FormOutlined/>}>
                            <Link to={`/questions`}>Quản lí câu hỏi</Link>
                        </Menu.Item>
                        <Menu.Item key="/mentees" icon={<TeamOutlined/>}>
                            <Link to={`/mentees`}>Quản lí Mentee</Link>
                        </Menu.Item>
                        <Menu.Item key="/mentors" icon={<TeamOutlined/>}>
                            <Link to={`/mentors`}>Quản lí Mentor</Link>
                        </Menu.Item>
                        <Menu.Item key="/feedbacks" icon={<CheckCircleOutlined/>}>
                            <Link to={`/feedbacks`}>Quản lí Feedback</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <HeaderComponent/>
                    {selectedKeys[0] !== '/' ? <PageHeaderComponent title={pageHeader.title} subTitle={pageHeader.subtitle} onAdd={setAddModalVisible}/> : null}
                    <HomeContent {...HomeContentProps}/>
                </Layout>
            </Layout>
        </Layout>
    );
}
