import * as React from 'react'

interface IProps {
    collapsed: boolean
}

const { useState, useEffect } = React
const InAppLogo = (props: IProps) => {
    const { collapsed } = props

    const [width, setWidth] = useState(200)
    const [imgUrl, setImgUrl] = useState(
        'https://res.cloudinary.com/dungnqhe151250/image/upload/v1619186953/logo/No_target_line_hlhrqn.svg'
    )

    useEffect(() => {
        if (collapsed) {
            setWidth(80)
            setImgUrl(
                'https://res.cloudinary.com/dungnqhe151250/image/upload/v1619186953/logo/Only_logo_rjicn5.svg'
            )
        } else {
            setWidth(200)
            setImgUrl(
                'https://res.cloudinary.com/dungnqhe151250/image/upload/v1619186953/logo/No_target_line_hlhrqn.svg'
            )
        }
    }, [collapsed])

    return (
        <div
            style={{
                width: width,
                height: 100,
                display: 'grid',
                placeItems: 'center',
            }}
        >
            <img
                alt={'in-app-logo'}
                width={width - 20}
                height={60}
                src={imgUrl}
            />
        </div>
    )
}

export default InAppLogo
