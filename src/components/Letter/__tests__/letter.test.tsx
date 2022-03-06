import * as React from 'react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { fireEvent, render, screen } from '@testing-library/react'

import {
    ADD_KNOWN_LETTER,
    REMOVE_KNOWN_LETTER,
    SET_KNOWN_LETTER_VALIDITY,
} from 'actions/letters.actions'
import { Letter } from 'components/Letter/letter'
import { theme } from 'theme/theme'
import { getStore } from 'utils/test.utils'

describe('components/letter', () => {
    const store = getStore()
    const Wrapper = ({ children }: { children: ReactNode | ReactNode[] }) => (
        <Provider store={store}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
    )

    beforeEach(() => {
        store.clearActions()
    })

    it('Renders a valid letter', () => {
        render(
            <Wrapper>
                <Letter data-testid="Letter0" id={0} />
            </Wrapper>
        )
        expect(screen.getByTestId('Letter0')).toHaveTextContent('A')
        expect(screen.getByTestId('Letter0')).toHaveStyle(
            `background-color: ${theme.letter.valid}; height: 100px; width: 100px;`
        )
        expect(screen.getByText('A')).toBeInTheDocument()
    })

    it('Renders an invalid letter', () => {
        render(
            <Wrapper>
                <Letter data-testid="Letter1" id={1} />
            </Wrapper>
        )
        expect(screen.getByTestId('Letter1')).toHaveTextContent('B')
        expect(screen.getByTestId('Letter1')).toHaveStyle(
            `background-color: ${theme.letter.invalid}`
        )
        expect(screen.getByText('B')).toBeInTheDocument()
    })

    it('Renders an empty letter', () => {
        render(
            <Wrapper>
                <Letter data-testid="Letter2" id={2} />
            </Wrapper>
        )
        expect(screen.getByTestId('Letter2')).toHaveTextContent('')
        expect(screen.getByTestId('Letter2')).toHaveStyle(
            `background-color: ${theme.letter.default}`
        )
    })

    it('Dispatches an action when a letter is clicked', () => {
        render(
            <Wrapper>
                <Letter id={0} />
            </Wrapper>
        )
        expect(store.getActions()).toStrictEqual([])
        fireEvent.click(screen.getByText('A'))
        expect(store.getActions()).toStrictEqual([
            {
                payload: { index: 0, valid: false },
                type: SET_KNOWN_LETTER_VALIDITY,
            },
        ])
    })

    it('Handles a keypress on a letter', async () => {
        render(
            <Wrapper>
                <Letter id={0} />
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
                payload: { index: 0, letter: 'B', valid: true },
                type: ADD_KNOWN_LETTER,
            },
        ])
    })

    it('Handles removing a letter', async () => {
        render(
            <Wrapper>
                <Letter id={0} />
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
                payload: { index: 0 },
                type: REMOVE_KNOWN_LETTER,
            },
        ])
    })
})
