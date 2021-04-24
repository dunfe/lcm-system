import * as React from 'react'
import { Result } from 'antd'
import { useTrans } from 'common'

const Results = () => {
    const trans = useTrans()

    return (
        <Result
            status="success"
            title={trans('Register successfully')}
            subTitle={trans(
                'We will contact to you via your email, phone number as soon as possible'
            )}
        />
    )
}

export default Results
