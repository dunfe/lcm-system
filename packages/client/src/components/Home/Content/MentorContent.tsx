import * as React from 'react'

import Dashboard from '../../../pages/Dashboard/Dashboard'
import ListQuestion from '../../../pages/Question/ListQuestion'
import Join from '../../Session/Join'
import Matching from '../../../pages/Matching/Matching'
import './MentorContent.css'
import Setting from '../../Setting/Setting'
import { Route, Switch } from 'react-router-dom'

interface IProps {
    path: string
}

const MentorContent = (props: IProps) => {
    const { path } = props

    return (
        <Switch>
            <Route exact path={path}>
                <Dashboard />
            </Route>
            <Route path={`/matching`}>
                <div className="site-layout-background">{Matching()}</div>
            </Route>
            <Route path={`/questions`}>
                <div style={{ padding: 24, backgroundColor: 'white' }}>
                    <ListQuestion />
                </div>
            </Route>
            <Route path={`/session`}>
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        backgroundColor: 'white',
                    }}
                >
                    <Join />
                </div>
            </Route>
            <Route path={`/setting`}>
                <div
                    style={{
                        padding: 24,
                        backgroundColor: 'white',
                        minHeight: 600,
                    }}
                >
                    <Setting />
                </div>
            </Route>
        </Switch>
    )
}

export default MentorContent
