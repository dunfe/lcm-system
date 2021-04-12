import * as React from 'react'
import { Menu } from 'antd'
import {
    CheckCircleOutlined,
    SettingOutlined,
    TeamOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

interface IProps {
    selectedKeys: string[]
    onSelect: (state: any) => void
}

const MentorMenu = (props: IProps) => {
    const { onSelect, selectedKeys } = props

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            onSelect={onSelect}
        >
            <Menu.Item key="/" icon={<UserOutlined />}>
                <Link to={`/`}>Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/questions" icon={<UnorderedListOutlined />}>
                <Link to={`/questions`}>Danh sách câu hỏi</Link>
            </Menu.Item>
            <Menu.Item key="/matching" icon={<CheckCircleOutlined />}>
                <Link to={`/matching`}>Matching</Link>
            </Menu.Item>
            <Menu.Item key="/session" icon={<TeamOutlined />}>
                <Link to={`/session`}>Session</Link>
            </Menu.Item>
            <Menu.Item key="1" icon={<SettingOutlined />}>
                Cài đặt
            </Menu.Item>
        </Menu>
    )
}

export default MentorMenu
