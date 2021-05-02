import * as React from 'react'

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext'

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
