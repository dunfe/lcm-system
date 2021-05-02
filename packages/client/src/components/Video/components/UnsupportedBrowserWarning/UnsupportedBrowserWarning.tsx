import React from 'react'
import Video from 'twilio-video'
import { Typography } from 'antd'
import { useTrans } from 'common'

const { Title, Text } = Typography

export default function UnsupportedBrowserWarning({
    children,
}: {
    children: React.ReactElement
}) {
    const trans = useTrans()

    if (!Video.isSupported) {
        return (
            <div>
                <Title>{trans('Browser or context not supported')}</Title>
                <Text>{trans('Please use chrome for video/audio call')}</Text>
            </div>
        )
    }

    return children
}
