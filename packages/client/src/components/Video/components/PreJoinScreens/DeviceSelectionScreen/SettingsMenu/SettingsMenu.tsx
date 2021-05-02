import * as React from 'react'

import DeviceSelectionDialog from '../../../DeviceSelectionDialog/DeviceSelectionDialog'
import { Space } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

const { useState } = React
const SettingsMenu = () => {
    const [deviceSettingsOpen, setDeviceSettingsOpen] = useState(false)

    return (
        <>
            <Space size={'large'}>
                <SettingOutlined
                    style={{ fontSize: 20 }}
                    onClick={() => setDeviceSettingsOpen(true)}
                />
            </Space>
            <DeviceSelectionDialog
                open={deviceSettingsOpen}
                onClose={() => {
                    setDeviceSettingsOpen(false)
                }}
            />
        </>
    )
}

export default SettingsMenu
