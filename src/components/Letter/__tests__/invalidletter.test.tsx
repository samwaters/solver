import * as React from 'react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { fireEvent, render, screen } from '@testing-library/react'

import {
    ADD_INVALID_LETTER,
    REMOVE_INVALID_LETTER,
} from 'actions/letters.actions'
import { InvalidLetter } from 'components/Letter/invalidletter'
import { theme } from 'theme/theme'
import { getStore } from 'utils/test.utils'

describe('components/invalidletter', () => {
    const store = getStore()
    const Wrapper = ({ children }: { children: ReactNode | ReactNode[] }) => (
        <Provider store={store}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
    )

    beforeEach(() => {
        store.clearActions()
    })

    it('Renders an invalid letter', () => {
        render(
            <Wrapper>
                <InvalidLetter
                    data-testid="InvalidLetter0"
                    id={'0'}
                    letter="A"
                />
            </Wrapper>
        )
        expect(screen.getByTestId('InvalidLetter0')).toHaveTextContent('A')
        expect(screen.getByTestId('InvalidLetter0')).toHaveStyle(
            `background-color: ${theme.letter.default}; height: 50px; width: 50px;`
        )
        expect(screen.getByText('A')).toBeInTheDocument()
    })

    it('Handles a keypress on an invalid letter', async () => {
        render(
            <Wrapper>
                <InvalidLetter data-testid="InvalidLetter0" id="0" letter="A" />
            </Wrapper>
        )
        expect(store.getActions()).toStrictEqual([])
        fireEvent.keyPress(screen.getByText('A'), {
            key: 'B',
            code: 'KeyB',
            charCode: 66,
        })
        expect(store.getActions()).toStrictEqual([
            {
                payload: { id: '0', letter: 'B' },
                type: ADD_INVALID_LETTER,
            },
        ])
    })

    it('Handles removing an invalid letter', async () => {
        render(
            <Wrapper>
                <InvalidLetter data-testid="0" id="0" letter="A" />
            </Wrapper>
        )
        expect(store.getActions()).toStrictEqual([])
        fireEvent.keyUp(screen.getByText('A'), {
            key: 'Backspace',
            code: 'Backspace',
            charCode: 9,
        })
        expect(store.getActions()).toStrictEqual([
            {
                payload: { id: '0' },
                type: REMOVE_INVALID_LETTER,
            },
        ])
    })
})
