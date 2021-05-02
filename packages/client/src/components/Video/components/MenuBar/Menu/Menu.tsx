import React, { useState } from 'react'
import DeviceSelectionDialog from '../../DeviceSelectionDialog/DeviceSelectionDialog'
import { Button } from 'antd'
import { useTrans } from 'common'
import { SettingOutlined } from '@ant-design/icons'

export default function SettingMenu() {
    const [settingsOpen, setSettingsOpen] = useState(false)
    const trans = useTrans()

    return (
        <>
            <Button
                type={'text'}
                icon={<SettingOutlined />}
                onClick={() => setSettingsOpen(true)}
            >
                {trans('Setting')}
            </Button>
            <DeviceSelectionDialog
                open={settingsOpen}
                onClose={() => {
                    setSettingsOpen(false)
                }}
            />
        </>
    )
}
