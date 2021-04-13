import { Avatar, Badge, Menu, Select } from 'antd'
import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../utils/hooks/useAuth'
import { BellOutlined, UserOutlined } from '@ant-design/icons'
import './Header.css'
import { useFullname } from '../../utils/hooks/useFullname'
import { useAvatar } from '../../utils/hooks/useAvatar'
import { useAPI } from '../../utils/hooks/useAPI'
import { useTranslation } from 'react-i18next'

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
    const { i18n } = useTranslation()

    const { setSelectedKeys } = props

    const [notify, setNotify] = useState<INotify[]>([])
    const [count, setCount] = useState(0)

    const onSignOut = () => {
        auth.signOut().then(() => {
            history.push('/')
        })
    }

    const onLocaleChange = (value) => {
        i18n.changeLanguage(value)
    }

    const onClickSetting = () => {
        setSelectedKeys(['/setting'])
    }

    useEffect(() => {
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
    }, [])

    const _notify = notify.map((item) => (
        <Menu.Item key={item._id}>{item.title}</Menu.Item>
    ))

    const MenuIcon = (
        <Badge count={count} showZero={true}>
            <BellOutlined style={{ fontSize: 20, paddingLeft: 10 }} />
        </Badge>
    )

    return (
        <Menu
            mode="horizontal"
            style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
            <SubMenu key="notify" icon={MenuIcon} style={{ paddingTop: 5 }}>
                <Menu.ItemGroup title="Thông báo của bạn">
                    {_notify}
                </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item>
                <Select
                    defaultValue="vi"
                    style={{ width: 120 }}
                    onChange={onLocaleChange}
                >
                    <Option value="vi">VI</Option>
                    <Option value="en">EN</Option>
                </Select>
            </Menu.Item>
            <SubMenu
                key="profile"
                icon={<Avatar src={avatar} icon={<UserOutlined />} />}
            >
                <Menu.Item onClick={onClickSetting}>
                    <Link to={`/setting`}>{userFullname}</Link>
                </Menu.Item>
                <Menu.Item danger>
                    <a onClick={onSignOut}>Đăng xuất</a>
                </Menu.Item>
            </SubMenu>
        </Menu>
    )
}

export default HeaderComponent
