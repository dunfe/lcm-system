import * as React from 'react'
import { Layout, notification } from 'antd'
import HeaderComponent from '../../components/Header/Header'
import { useRouteMatch } from 'react-router-dom'
import PageHeader from '../../components/Header/PageHeader'
import MenteeContent from '../../components/Home/Content/MenteeContent'
import MentorContent from '../../components/Home/Content/MentorContent'
import MenteeMenu from '../../components/Menu/MenteeMenu'
import MentorMenu from '../../components/Menu/MentorMenu'
import { LogoContainer } from '../../components/Logo/LogoContainer'
import { Logo } from '../../components/Logo/Logo'
import { useRole } from '../../utils/hooks/useRole'
import { useTranslation } from 'react-i18next'

const { Sider, Content, Footer } = Layout

const { useState, useEffect } = React

const HomePage = () => {
    //check login
    const role = useRole()
    const { path } = useRouteMatch()
    const { t } = useTranslation()

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
                        title: t('Add question'),
                        subtitle: t('Ask a question for help'),
                    })
                    break
                case '/questions':
                    setPageHeader({
                        title: t('Questions'),
                        subtitle: t('Your questions'),
                    })
                    break
                case '/matching':
                    notification.open({
                        message: t('Guide'),
                        description: t(
                            'Use your mouse then click onto the card and swipe to right to choose, left to ignore'
                        ),
                        placement: 'bottomRight',
                    })
                    setPageHeader({
                        title: t('Matching'),
                        subtitle: t('Swipe right to select a question'),
                    })
                    break
                case '/session':
                    setPageHeader({
                        title: t('Session'),
                        subtitle: t('Your session'),
                    })
                    break
                case '/favorite':
                    setPageHeader({
                        title: t('Your favorite mentor'),
                        subtitle: '',
                    })
                    break
                case '/setting':
                    setPageHeader({
                        title: t('Setting'),
                        subtitle: t('Setting your account'),
                    })
                    break
            }
        }
    }, [selectedKeys])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible theme={'dark'}>
                <LogoContainer>
                    <Logo
                        width={200}
                        height={60}
                        src={
                            'https://res.cloudinary.com/dungnqhe151250/image/upload/v1619186953/logo/No_target_line_hlhrqn.svg'
                        }
                    />
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
                    {role === 'mentee' ? (
                        <MenteeContent
                            path={path}
                            setSelectedKeys={setSelectedKeys}
                        />
                    ) : (
                        <MentorContent path={path} />
                    )}
                </Content>
                <Footer style={{ textAlign: 'center' }}>LCM ©2020</Footer>
            </Layout>
        </Layout>
    )
}

export default HomePage
