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
import { useTranslation } from 'react-i18next'

interface IProps {
    selectedKeys: string[]
    onSelect: (state: any) => void
}

const MentorMenu = (props: IProps) => {
    const { onSelect, selectedKeys } = props
    const { t } = useTranslation()

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            onSelect={onSelect}
        >
            <Menu.Item key="/" icon={<UserOutlined />}>
                <Link to={`/`}>{t('Dashboard')}</Link>
            </Menu.Item>
            <Menu.Item key="/questions" icon={<UnorderedListOutlined />}>
                <Link to={`/questions`}>{t('Questions')}</Link>
            </Menu.Item>
            <Menu.Item key="/matching" icon={<CheckCircleOutlined />}>
                <Link to={`/matching`}>{t('Matching')}</Link>
            </Menu.Item>
            <Menu.Item key="/session" icon={<TeamOutlined />}>
                <Link to={`/session`}>{t('Session')}</Link>
            </Menu.Item>
            <Menu.Item key="/setting" icon={<SettingOutlined />}>
                <Link to={`/setting`}>{t('Setting')}</Link>
            </Menu.Item>
        </Menu>
    )
}

export default MentorMenu
