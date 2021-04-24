import * as React from 'react'

interface IProps {
    src: string
    width: number
    height: number
}
export const Logo = (props: IProps) => {
    const { src, width, height } = props
    return <img style={{ width, height }} src={src} alt={'logo'} />
}
