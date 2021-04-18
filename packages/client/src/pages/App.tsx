import React from 'react'
import './App.css'
import { ProvideAuth } from '../utils/hooks/useAuth'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PrivateRoute, StyledLoading } from '../components/Auth/PrivateRoute'
import { NotFoundPage } from '../components/NotFoundPage'
import LoginPage from './Login/LoginPage'
import { ConfigProvider, Spin } from 'antd'
import viVN from 'antd/lib/locale/vi_VN'
import { useTranslation } from 'react-i18next'

const { Suspense, lazy } = React

const HomePage = lazy(() => import('./Home/Home'))
const SessionPage = lazy(() => import('./Session/SessionPage'))

function App(): JSX.Element {
    const { t } = useTranslation()

    return (
        <Suspense
            fallback={
                <StyledLoading>
                    <Spin tip={t('Loading...')} />
                </StyledLoading>
            }
        >
            <ConfigProvider locale={viVN}>
                <ProvideAuth>
                    <Router>
                        <Switch>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/join" component={SessionPage} />
                            <PrivateRoute path="/">
                                <HomePage />
                            </PrivateRoute>
                            <Route component={NotFoundPage} />
                        </Switch>
                    </Router>
                </ProvideAuth>
            </ConfigProvider>
        </Suspense>
    )
}

export default App
