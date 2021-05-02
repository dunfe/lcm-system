import * as React from 'react'

import { useAppState } from '../../../state'
import useDevices from '../../../hooks/useDevices/useDevices'
import { Select, Typography } from 'antd'

const { Text } = Typography

export default function AudioOutputList() {
    const { audioOutputDevices } = useDevices()
    const { activeSinkId, setActiveSinkId } = useAppState()
    const activeOutputLabel = audioOutputDevices.find(
        (device) => device.deviceId === activeSinkId
    )?.label

    const audioOptions = audioOutputDevices.map((device) => {
        return {
            label: device.label,
            value: device.deviceId,
        }
    })

    return (
        <div className="inputSelect">
            {audioOutputDevices.length > 1 ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Text>Audio Output</Text>
                    <Select
                        onChange={(e) => setActiveSinkId(e)}
                        value={activeSinkId}
                        options={audioOptions}
                    />
                </div>
            ) : (
                <>
                    <Text>Audio Output</Text>
                    <Text>
                        {activeOutputLabel || 'System Default Audio Output'}
                    </Text>
                </>
            )}
        </div>
    )
}
