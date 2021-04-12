import * as React from 'react'
import { Layout, notification } from 'antd'
import HeaderComponent from '../../components/Header/Header'
import { Switch, useRouteMatch } from 'react-router-dom'
import PageHeader from '../../components/Header/PageHeader'
import MenteeContent from '../../components/Home/Content/MenteeContent'
import MentorContent from '../../components/Home/Content/MentorContent'
import MenteeMenu from '../../components/Menu/MenteeMenu'
import MentorMenu from '../../components/Menu/MentorMenu'
import { LogoContainer } from '../../components/Logo/LogoContainer'
import { Logo } from '../../components/Logo/Logo'
import { useRole } from '../../utils/hooks/useRole'

const { Sider, Content, Footer } = Layout

const { useState, useEffect } = React

export function HomePage() {
    //check login
    const role = useRole()
    const { path } = useRouteMatch()
    const [selectedKeys, setSelectedKeys] = useState([location.pathname])
    const [pageHeader, setPageHeader] = useState({
        title: '',
        subtitle: '',
    })

    const onSelect = ({ selectedKeys }: any) => {
        setSelectedKeys(selectedKeys)
    }

    useEffect(() => {
        if (selectedKeys) {
            switch (selectedKeys[0]) {
                case '/add':
                    setPageHeader({
                        title: 'Tạo câu hỏi',
                        subtitle: 'Tạo một câu hỏi để được giúp đỡ',
                    })
                    break
                case '/questions':
                    setPageHeader({
                        title: 'Danh sách câu hỏi',
                        subtitle: 'Danh sách những câu hỏi của bạn',
                    })
                    break
                case '/matching':
                    notification.open({
                        message: 'Hướng dẫn sử dụng',
                        description:
                            'Sử dụng chuột click và kéo câu hỏi sang bên phải để chấp nhận trả lời, kéo sang trái để bỏ qua!',
                        placement: 'bottomRight',
                    })
                    setPageHeader({
                        title: 'Matching',
                        subtitle: 'Chọn câu hỏi để trả lời',
                    })
                    break
                case '/session':
                    setPageHeader({
                        title: 'Session',
                        subtitle: 'Danh sách session',
                    })
                    break
                case '/setting':
                    setPageHeader({
                        title: 'Cài đặt',
                        subtitle: 'Tuỳ chỉnh tài khoản của bạn',
                    })
                    break
            }
        }
    }, [selectedKeys])

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider collapsible theme={'dark'}>
                <LogoContainer className="logo">
                    <Logo />
                </LogoContainer>
                {role === 'mentee' ? (
                    <MenteeMenu
                        selectedKeys={selectedKeys}
                        onSelect={onSelect}
                    />
                ) : (
                    <MentorMenu
                        selectedKeys={selectedKeys}
                        onSelect={onSelect}
                    />
                )}
            </Sider>
            <Layout>
                <HeaderComponent setSelectedKeys={setSelectedKeys} />
                {selectedKeys.filter((item) => item === '/').length <= 0 ? (
                    <PageHeader
                        title={pageHeader.title}
                        subTitle={pageHeader.subtitle}
                    />
                ) : null}
                <Content style={{ margin: '24px 16px 0' }}>
                    <Switch>
                        <>
                            {role === 'mentee' ? (
                                <MenteeContent
                                    path={path}
                                    setSelectedKeys={setSelectedKeys}
                                />
                            ) : (
                                <MentorContent path={path} />
                            )}
                        </>
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>LCM ©2020</Footer>
            </Layout>
        </Layout>
    )
}
