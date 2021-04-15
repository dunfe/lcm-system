import * as React from 'react'
import { Menu, Row, Col } from 'antd'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import InfoSetting from './InfoSetting'
import { useTranslation } from 'react-i18next'

const Setting = () => {
    const { path, url } = useRouteMatch()
    const { t } = useTranslation()

    return (
        <Row gutter={24} style={{ backgroundColor: 'white' }}>
            <Col span={6}>
                <Menu
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    mode="inline"
                >
                    <Menu.Item key="1">
                        <Link to={`${url}`}>{t('Basic Information')}</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={`${url}/security`}>
                            {t('Security Setting')}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={`${url}/notification`}>
                            {t('Notification Setting')}
                        </Link>
                    </Menu.Item>
                </Menu>
            </Col>
            <Col span={18}>
                <Switch>
                    <Route exact path={path}>
                        <div
                            style={{
                                padding: 24,
                                backgroundColor: 'white',
                            }}
                        >
                            <InfoSetting />
                        </div>
                    </Route>
                    <Route path={`${path}/security`}>
                        <div style={{ padding: 24 }}>
                            {t('Security Setting')}
                        </div>
                    </Route>
                    <Route path={`${path}/notification`}>
                        <div style={{ padding: 24 }}>
                            {t('Notification Setting')}
                        </div>
                    </Route>
                </Switch>
            </Col>
        </Row>
    )
}

export default Setting
