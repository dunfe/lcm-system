import * as React from 'react'

import { P } from './P'
import styled from 'styled-components/macro'
import { useTranslation } from 'react-i18next'

export function NotFoundPage() {
    const { t } = useTranslation()
    return (
        <>
            <Wrapper>
                <Title>
                    4
                    <span role="img" aria-label="Crying Face">
                        😢
                    </span>
                    4
                </Title>
                <P>{t('Page not found.')}</P>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 320px;
`

const Title = styled.div`
    margin-top: -8vh;
    font-weight: bold;
    color: black;
    font-size: 3.375rem;

    span {
        font-size: 3.125rem;
    }
`
