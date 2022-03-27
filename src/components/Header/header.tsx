import * as React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { reset } from 'actions/reset.actions'
import { Theme } from 'theme/theme'

const HeaderComponent = styled.div<{ theme: Theme }>`
    background-color: ${(props) => props.theme.header.background};
    display: flex;
    padding: 5px 10px;
`

const HeaderText = styled.h1<{ theme: Theme }>`
    color: ${(props) => props.theme.header.color};
    flex: 1;
    font-size: ${(props) => props.theme.header.size};
`

const ResetButton = styled.button`
    background-color: black;
    border: 1px solid #777c7e;
    border-radius: 5px;
    color: #ef9665;
    cursor: pointer;
    font-weight: bold;
    padding: 5px 20px;
    :hover {
        background-color: #777c7e;
        color: white;
    }
`

export const Header = () => {
    const dispatch = useDispatch()
    const handleReset = () => dispatch(reset())
    return (
        <HeaderComponent data-testid="header-container">
            <HeaderText data-testid="header-text">Solver</HeaderText>
            <ResetButton onClick={handleReset} data-testid="header-button">
                Reset
            </ResetButton>
        </HeaderComponent>
    )
}
