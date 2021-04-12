import * as React from 'react'
import { Menu, Row, Col } from 'antd'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import InfoSetting from './InfoSetting'

const Setting = () => {
    const { path, url } = useRouteMatch()
    return (
        <Row gutter={24}>
            <Col span={6}>
                <Menu
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    mode="inline"
                >
                    <Menu.Item key="1">
                        <Link to={`${url}`}>Thông tin cơ bản</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={`${url}/security`}>Cài đặt bảo mật</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={`${url}/notification`}>
                            Cài đặt thông báo
                        </Link>
                    </Menu.Item>
                </Menu>
            </Col>
            <Col span={18}>
                <Switch>
                    <Route exact path={path}>
                        <div style={{ padding: 24 }}>
                            <InfoSetting />
                        </div>
                    </Route>
                    <Route path={`${path}/security`}>
                        <div style={{ padding: 24 }}>Cài đặt bảo mật</div>
                    </Route>
                    <Route path={`${path}/notification`}>
                        <div style={{ padding: 24 }}>Cài đặt thông báo</div>
                    </Route>
                </Switch>
            </Col>
        </Row>
    )
}

export default Setting
