import * as React from 'react'
import { Select, Tabs } from 'antd'
import styled from 'styled-components'
import SignInComponent from '../../components/Auth/SignInComponent'
import SignUpComponent from '../../components/Auth/SignUpComponent'
import QuickLogin from '../../components/Auth/QuickLogin'
import { Logo } from '../../components/Logo/Logo'
import { useTranslation } from 'react-i18next'
import ForgotPassword from '../../components/Auth/ForgotPassword'

const { TabPane } = Tabs
const { Option } = Select

const { useState } = React

const LoginPage = () => {
    const { t, i18n } = useTranslation()
    const [activeKey, setActiveKey] = useState('1')

    const onLocaleChange = (value) => {
        i18n.changeLanguage(value)
    }

    const onChange = (key) => {
        setActiveKey(key)
    }

    return (
        <LoginPageContainer className={'login-page-container'}>
            <Locale>
                <Select
                    size={'small'}
                    defaultValue="vi"
                    onChange={onLocaleChange}
                >
                    <Option value="vi">VI</Option>
                    <Option value="en">EN</Option>
                </Select>
            </Locale>
            <LogoContainer>
                <Logo
                    width={250}
                    height={150}
                    src={
                        'https://res.cloudinary.com/dungnqhe151250/image/upload/v1619186953/logo/Logo2_xnkzp1.svg'
                    }
                />
            </LogoContainer>
            <QuickLogin />
            <StyledTabs activeKey={activeKey} onChange={onChange}>
                <TabPane tab={t('Login')} key="1">
                    <SignInComponent setActiveKey={setActiveKey} />
                </TabPane>
                <TabPane tab={t('Register')} key="2">
                    <SignUpComponent />
                </TabPane>
                <TabPane tab={t('Forgot Password')} key="3">
                    <ForgotPassword setActiveKey={setActiveKey} />
                </TabPane>
            </StyledTabs>
        </LoginPageContainer>
    )
}

const StyledTabs = styled(Tabs)`
    width: 360px;
`

export const LoginPageContainer = styled.div`
    display: grid;
    place-items: center;
`

const LogoContainer = styled.div`
    padding-top: 30px;
    padding-bottom: 30px;
`

const Locale = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 12px;
`

export default LoginPage
