import * as React from 'react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { fireEvent, render, screen } from '@testing-library/react'

import { RESET } from 'actions/reset.actions'
import { Header } from 'components/Header/header'
import { theme } from 'theme/theme'
import { getStore } from 'utils/test.utils'

describe('components/header', () => {
    const store = getStore()
    const Wrapper = ({ children }: { children: ReactNode | ReactNode[] }) => (
        <Provider store={store}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
    )

    beforeEach(() => {
        store.clearActions()
    })

    it('Renders the header', () => {
        render(
            <Wrapper>
                <Header />
            </Wrapper>
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
            <Wrapper>
                <Header />
            </Wrapper>
        )
        expect(store.getActions()).toStrictEqual([])
        fireEvent.click(screen.getByTestId('header-button'))
        expect(store.getActions()).toStrictEqual([
            {
                type: RESET,
            },
        ])
    })
})
