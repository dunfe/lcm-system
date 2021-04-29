import useVideoContext from '../../../hooks/useVideoContext/useVideoContext'
import React from 'react'

import { useTrans } from 'common'
import { Button } from 'antd'

export default function EndCallButton() {
    const { room } = useVideoContext()
    const trans = useTrans()

    return (
        <Button danger onClick={() => room!.disconnect()} data-cy-disconnect>
            {trans('Disconnect')}
        </Button>
    )
}
