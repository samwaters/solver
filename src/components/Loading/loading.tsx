import * as React from 'react'
import styled from 'styled-components'

const LoadingContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`

const LoadingSpinner = styled.div`
    height: 80px;
    position: relative;
    width: 80px;
    div {
        animation: loading 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        background: #fff;
        display: inline-block;
        position: absolute;
        width: 16px;
    }
    div:nth-child(1) {
        animation-delay: -0.24s;
        left: 8px;
    }
    div:nth-child(2) {
        animation-delay: -0.12s;
        left: 32px;
    }
    div:nth-child(3) {
        left: 56px;
    }
    @keyframes loading {
        0% {
            top: 8px;
            height: 64px;
        }
        50%,
        100% {
            top: 24px;
            height: 32px;
        }
    }
`

const LoadingText = styled.div`
    color: white;
`

export const Loading = () => (
    <LoadingContainer>
        <LoadingSpinner>
            <div />
            <div />
            <div />
        </LoadingSpinner>
        <LoadingText>Loading, Please Wait...</LoadingText>
    </LoadingContainer>
)
