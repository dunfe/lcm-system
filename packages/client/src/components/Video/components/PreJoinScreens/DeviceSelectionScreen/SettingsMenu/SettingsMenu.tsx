import React, { useState } from 'react'
import AboutDialog from '../../../AboutDialog/AboutDialog'
import ConnectionOptionsDialog from '../../../ConnectionOptionsDialog/ConnectionOptionsDialog'
import DeviceSelectionDialog from '../../../DeviceSelectionDialog/DeviceSelectionDialog'
import { useAppState } from '../../../../state'
import { Space } from 'antd'
import { InfoOutlined, SettingOutlined, WifiOutlined } from '@ant-design/icons'

const SettingsMenu = () => {
    const { roomType } = useAppState()
    const [aboutOpen, setAboutOpen] = useState(false)
    const [deviceSettingsOpen, setDeviceSettingsOpen] = useState(false)
    const [connectionSettingsOpen, setConnectionSettingsOpen] = useState(false)

    return (
        <>
            <Space size={'large'}>
                <InfoOutlined
                    style={{ fontSize: 20 }}
                    onClick={() => setAboutOpen(true)}
                />
                <SettingOutlined
                    style={{ fontSize: 20 }}
                    onClick={() => setDeviceSettingsOpen(true)}
                />
                {roomType !== 'peer-to-peer' && roomType !== 'go' && (
                    <WifiOutlined
                        style={{ fontSize: 20 }}
                        onClick={() => setConnectionSettingsOpen(true)}
                    />
                )}
            </Space>
            <AboutDialog
                open={aboutOpen}
                onClose={() => {
                    setAboutOpen(false)
                }}
            />
            <DeviceSelectionDialog
                open={deviceSettingsOpen}
                onClose={() => {
                    setDeviceSettingsOpen(false)
                }}
            />
            <ConnectionOptionsDialog
                open={connectionSettingsOpen}
                onClose={() => {
                    setConnectionSettingsOpen(false)
                }}
            />
        </>
    )
}

export default SettingsMenu
