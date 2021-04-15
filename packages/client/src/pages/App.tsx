import React from 'react'
import './App.css'
import { ProvideAuth } from '../utils/hooks/useAuth'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from '../components/Auth/PrivateRoute'
import { HomePage } from './Home/Home'
import { NotFoundPage } from '../components/NotFoundPage'
import LoginPage from './Login/LoginPage'
import SessionPage from './Session/SessionPage'
import { ConfigProvider } from 'antd'
import viVN from 'antd/lib/locale/vi_VN'

const { Suspense } = React

function App(): JSX.Element {
    return (
        <Suspense fallback="loading">
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
