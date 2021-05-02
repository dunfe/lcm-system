import * as React from 'react'

import AudioInputList from './AudioInputList/AudioInputList'
import AudioOutputList from './AudioOutputList/AudioOutputList'
import VideoInputList from './VideoInputList/VideoInputList'
import { Modal, Space, Typography } from 'antd'
import { useTrans } from 'common'

const { Title } = Typography

export default function DeviceSelectionDialog({
    open,
    onClose,
}: {
    open: boolean
    onClose: () => void
}) {
    const trans = useTrans()

    return (
        <Modal
            visible={open}
            onOk={onClose}
            okText={trans('Done')}
            onCancel={onClose}
            title={trans('Audio and Video Settings')}
        >
            <Space direction={'vertical'}>
                <Space direction={'vertical'}>
                    <Title level={3}>Video</Title>
                    <VideoInputList />
                </Space>
                <Space direction={'vertical'}>
                    <Title level={3}>Audio</Title>
                    <AudioInputList />
                </Space>
                <Space>
                    <AudioOutputList />
                </Space>
            </Space>
        </Modal>
    )
}
