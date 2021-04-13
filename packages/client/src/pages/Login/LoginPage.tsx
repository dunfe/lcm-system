import * as React from 'react'
import { Select, Tabs } from 'antd'
import styled from 'styled-components'
import SignInComponent from '../../components/Auth/SignInComponent'
import SignUpComponent from '../../components/Auth/SignUpComponent'
import QuickLogin from '../../components/Auth/QuickLogin'
import { Logo } from '../../components/Logo/Logo'
import { useTranslation } from 'react-i18next'

const { TabPane } = Tabs
const { Option } = Select

const LoginPage = () => {
    const { t, i18n } = useTranslation()

    const onLocaleChange = (value) => {
        i18n.changeLanguage(value)
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
                <Logo />
            </LogoContainer>
            <QuickLogin />
            <StyledTabs defaultActiveKey="1">
                <TabPane tab={t('Login')} key="1">
                    <SignInComponent />
                </TabPane>
                <TabPane tab={t('Register')} key="2">
                    <SignUpComponent />
                </TabPane>
            </StyledTabs>
        </LoginPageContainer>
    )
}

const StyledTabs = styled(Tabs)`
    width: 360px;
`

const LoginPageContainer = styled.div`
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
