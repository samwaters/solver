import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { RESET } from 'actions/reset.actions'
import { Header } from 'components/Header/header'
import { theme } from 'theme/theme'
import { testStore, TestWrapper } from 'utils/test.utils'

describe('components/header', () => {
    beforeEach(() => {
        testStore.clearActions()
    })

    it('Renders the header', () => {
        render(
            <TestWrapper>
                <Header />
            </TestWrapper>
        )
        expect(screen.getByTestId('header-container')).toBeInTheDocument()
        expect(screen.getByTestId('header-text')).toBeInTheDocument()
        expect(screen.getByTestId('header-button')).toBeInTheDocument()
        expect(screen.getByTestId('header-container')).toHaveStyle(
            `background-color: ${theme.header.background}; display: flex; padding: 5px 10px;`
        )
        expect(screen.getByTestId('header-container')).toHaveTextContent(
            'Solver'
        )
        expect(screen.getByTestId('header-button')).toHaveTextContent('Reset')
        expect(screen.getByTestId('header-button')).toHaveStyle(`
            background-color: black;
            border: 1px solid #777c7e;
            border-radius: 5px;
            color: #ef9665;
            cursor: pointer;
            font-weight: bold;
            padding: 5px 20px;
        `)
    })

    it('Dispatches the reset action', () => {
        render(
            <TestWrapper>
                <Header />
            </TestWrapper>
        )
        expect(testStore.getActions()).toStrictEqual([])
        fireEvent.click(screen.getByTestId('header-button'))
        expect(testStore.getActions()).toStrictEqual([
            {
                type: RESET,
            },
        ])
    })
})
