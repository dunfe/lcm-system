import * as React from 'react'
import { Menu } from 'antd'
import {
    DollarCircleOutlined,
    AppstoreAddOutlined,
    SettingOutlined,
    TeamOutlined,
    UnorderedListOutlined,
    UserOutlined,
    HeartOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface IProps {
    selectedKeys: string[]
    onSelect: (state: any) => void
}

const MenteeMenu = (props: IProps) => {
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
            <Menu.Item key="/add" icon={<AppstoreAddOutlined />}>
                <Link to={`/add`}>{t('Add question')}</Link>
            </Menu.Item>
            <Menu.Item key="/questions" icon={<UnorderedListOutlined />}>
                <Link to={`/questions`}>{t('Questions')}</Link>
            </Menu.Item>
            <Menu.Item key="/session" icon={<TeamOutlined />}>
                <Link to={`/session`}>{t('Session')}</Link>
            </Menu.Item>
            <Menu.Item key={`/billing`} icon={<DollarCircleOutlined />}>
                <Link to={`/billing`}>{t('Billing')}</Link>
            </Menu.Item>
            <Menu.Item key={`/favorite`} icon={<HeartOutlined />}>
                <Link to={`/favorite`}>{t('Favorite Mentor')}</Link>
            </Menu.Item>
            <Menu.Item key="/setting" icon={<SettingOutlined />}>
                <Link to={`/setting`}>{t('Setting')}</Link>
            </Menu.Item>
        </Menu>
    )
}

export default MenteeMenu
