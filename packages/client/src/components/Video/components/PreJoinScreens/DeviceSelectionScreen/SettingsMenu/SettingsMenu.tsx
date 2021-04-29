import React, { useState } from 'react'
import ConnectionOptionsDialog from '../../../ConnectionOptionsDialog/ConnectionOptionsDialog'
import DeviceSelectionDialog from '../../../DeviceSelectionDialog/DeviceSelectionDialog'
import { useAppState } from '../../../../state'
import { Space } from 'antd'
import { SettingOutlined, WifiOutlined } from '@ant-design/icons'

const SettingsMenu = () => {
    const { roomType } = useAppState()
    const [deviceSettingsOpen, setDeviceSettingsOpen] = useState(false)
    const [connectionSettingsOpen, setConnectionSettingsOpen] = useState(false)

    return (
        <>
            <Space size={'large'}>
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
