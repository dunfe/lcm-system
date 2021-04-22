import React from 'react'
import './App.css'
import { ProvideAuth } from '../utils/hooks/useAuth'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from '../components/Auth/PrivateRoute'
import { HomePage } from './Home/Home'
import { NotFoundPage } from '../components/NotFoundPage'
import LoginPage from './Login/LoginPage'
import { Spin } from 'antd'
import styled from 'styled-components/macro'

const { Suspense } = React

function App(): JSX.Element {
    return (
        <Suspense fallback={
            <StyledLoading>
                <Spin tip={'Loading...'} />
            </StyledLoading>}>
            <ProvideAuth>
                <BrowserRouter>
                    <Switch>
                        <Route path='/login' component={LoginPage} />
                        <PrivateRoute path='/'>
                            <HomePage />
                        </PrivateRoute>
                        <Route component={NotFoundPage} />
                    </Switch>
                </BrowserRouter>
            </ProvideAuth>
        </Suspense>
    )
}

export const StyledLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
`

export default App
