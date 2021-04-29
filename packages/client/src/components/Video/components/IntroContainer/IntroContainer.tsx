import React from 'react'
import { Card } from 'antd'
import styled from 'styled-components/macro'

interface IntroContainerProps {
    children: React.ReactNode
}

const IntroContainer = (props: IntroContainerProps) => {
    return (
        <StyledDiv>
            <Card
                bordered={false}
                style={{
                    width: 800,
                    height: 400,
                    display: 'grid',
                    placeItems: 'center',
                }}
                cover={
                    <img
                        style={{
                            width: 200,
                            height: 'auto',
                            display: 'grid',
                            placeItems: 'center',
                            margin: 'auto',
                            padding: 12,
                        }}
                        src={
                            'https://res.cloudinary.com/dungnqhe151250/image/upload/v1619186953/logo/Logo2_xnkzp1.svg'
                        }
                        alt={'logo'}
                    />
                }
            >
                {props.children}
            </Card>
        </StyledDiv>
    )
}

const StyledDiv = styled.div`
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
`

export default IntroContainer
