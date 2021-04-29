import LoginPage from './Login/LoginPage'
import BecomeMentor from './BecomeMentor/BecomeMentor'
import { ProvideAuth } from '../utils/hooks/useAuth'
import { PrivateRoute, StyledLoading } from '../components/Auth/PrivateRoute'
import { NotFoundPage } from '../components/NotFoundPage'
import { ConfigProvider, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import React from 'react'
import './App.css'
import viVN from 'antd/lib/locale/vi_VN'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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
                            <PrivateRoute path="/become-mentor">
                                <BecomeMentor />
                            </PrivateRoute>
                            <PrivateRoute path="/room/:id">
                                <SessionPage />
                            </PrivateRoute>
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
