import * as React from 'react'

import { useAuth } from '../../utils/hooks/useAuth'
import { useFullname } from '../../utils/hooks/useFullname'
import { useAvatar } from '../../utils/hooks/useAvatar'
import { useAPI } from '../../utils/hooks/useAPI'
import { useRole } from '../../utils/hooks/useRole'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import Text from 'antd/es/typography/Text'
import Title from 'antd/es/typography/Title'
import { useTrans } from 'common'
import { Link, useHistory } from 'react-router-dom'
import './Header.css'
import {
    Avatar,
    Badge,
    Button,
    Divider,
    Dropdown,
    List,
    Menu,
    message,
    Select,
} from 'antd'
import {
    BellOutlined,
    UserOutlined,
    CheckCircleTwoTone,
} from '@ant-design/icons'

interface INotify {
    read: boolean
    _id: string
    title: string
    receivedById: string
    content: string
    createdAt: string
    __v: number
}

interface IProps {
    setSelectedKeys: (state: string[]) => void
}

const { SubMenu } = Menu
const { Option } = Select

const { useState, useEffect } = React

const HeaderComponent = (props: IProps) => {
    const history = useHistory()
    const auth = useAuth()
    const userFullname = useFullname()
    const avatar = useAvatar()
    const instance = useAPI()
    const { t, i18n } = useTranslation()
    const trans = useTrans()
    const role = useRole()

    const { setSelectedKeys } = props

    const [notify, setNotify] = useState<INotify[]>([])
    const [count, setCount] = useState(0)

    const onSignOut = () => {
        auth.signOut().then(() => {
            history.push('/')
        })
    }

    const onLocaleChange = (value) => {
        i18n.changeLanguage(value).then(() => {
            message.success(t(`Changed language to ${value}`))
        })
    }

    const onClickSetting = () => {
        setSelectedKeys(['/setting'])
    }

    const getNotify = () => {
        instance
            .get(`/api/users/notify`)
            .then((response) => {
                if (response.status === 200) {
                    setNotify(response.data.data.results)
                    const _count = response.data.readFalse
                    setCount(_count)
                }
            })
            .catch((error) => console.error(error))
    }

    useEffect(() => {
        getNotify()
    }, [])

    const NotifyIcon = () => {
        return (
            <Dropdown overlay={overlay} trigger={['click']}>
                <Badge count={count} showZero={true}>
                    <BellOutlined />
                </Badge>
            </Dropdown>
        )
    }

    const markRead = (id: string) => {
        instance
            .put(`/api/users/notify/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    getNotify()
                }
            })
            .then(() => history.push('/session'))
            .catch((error) => console.error(error))
    }

    const overlay = () => {
        return (
            <List
                size="large"
                header={
                    <Divider>
                        <Title level={3}>{t('Your notification')}</Title>
                    </Divider>
                }
                style={{
                    width: 600,
                    maxHeight: '90vh',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                }}
                bordered
                itemLayout="horizontal"
                dataSource={notify}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <CheckCircleTwoTone twoToneColor={'#2ecc71'} />
                            }
                            title={
                                item.read ? (
                                    <Text
                                        style={{ color: 'gray' }}
                                        onClick={() => history.push('/session')}
                                    >
                                        {item.title}
                                    </Text>
                                ) : (
                                    <Text strong>
                                        <a onClick={() => markRead(item._id)}>
                                            {' '}
                                            {item.title}
                                        </a>
                                    </Text>
                                )
                            }
                        />
                    </List.Item>
                )}
            />
        )
    }

    const onBecome = () => {
        history.push('/become-mentor')
    }

    return (
        <StyledHeader mode="horizontal">
            {role === 'mentee' ? (
                <Menu.Item key={'become'}>
                    <Button type={'primary'} onClick={onBecome}>
                        {trans('Become a Mentor')}
                    </Button>
                </Menu.Item>
            ) : null}
            <Menu.Item key={'notify'}>
                <NotifyIcon />
            </Menu.Item>
            <SubMenu
                key="profile"
                icon={<Avatar src={avatar} icon={<UserOutlined />} />}
            >
                <StyledMenuItem onClick={onClickSetting}>
                    <Link to={`/setting`}>{userFullname}</Link>
                </StyledMenuItem>
                <Menu.Item danger>
                    <a onClick={onSignOut}>{t('Logout')}</a>
                </Menu.Item>
            </SubMenu>
            <Menu.Item danger>
                <Select
                    defaultValue="vi"
                    size={'small'}
                    onChange={onLocaleChange}
                >
                    <Option value="vi">VI</Option>
                    <Option value="en">EN</Option>
                </Select>
            </Menu.Item>
        </StyledHeader>
    )
}

const StyledHeader = styled(Menu)`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    background-color: white;
    align-items: center;
`

const StyledMenuItem = styled(Menu.Item)`
    max-width: 300px;
`

export default HeaderComponent
