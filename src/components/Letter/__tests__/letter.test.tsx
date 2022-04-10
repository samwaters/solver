import * as React from 'react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { fireEvent, render, screen } from '@testing-library/react'

import { ADD_KNOWN_LETTER, REMOVE_KNOWN_LETTER } from 'actions/letters.actions'
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
                <Letter data-testid="Letter0" row={0} id={0} />
            </Wrapper>
        )
        expect(screen.getByTestId('Letter0')).toHaveTextContent('A')
        expect(screen.getByTestId('Letter0')).toHaveStyle(
            `background-color: ${theme.letter.valid}; height: 75px; width: 75px;`
        )
        expect(screen.getByText('A')).toBeInTheDocument()
    })

    it('Renders a known letter in the wrong place', () => {
        render(
            <Wrapper>
                <Letter data-testid="Letter1" row={0} id={1} />
            </Wrapper>
        )
        expect(screen.getByTestId('Letter1')).toHaveTextContent('B')
        expect(screen.getByTestId('Letter1')).toHaveStyle(
            `background-color: ${theme.letter.invalid}`
        )
        expect(screen.getByText('B')).toBeInTheDocument()
    })

    it('Renders an invalid letter', () => {
        render(
            <Wrapper>
                <Letter data-testid="Letter2" row={0} id={2} />
            </Wrapper>
        )
        expect(screen.getByTestId('Letter2')).toHaveTextContent('C')
        expect(screen.getByTestId('Letter2')).toHaveStyle(
            `background-color: ${theme.letter.default}`
        )
        expect(screen.getByText('C')).toBeInTheDocument()
    })

    it('Renders an empty letter', () => {
        render(
            <Wrapper>
                <Letter data-testid="Letter3" row={0} id={3} />
            </Wrapper>
        )
        expect(screen.getByTestId('Letter3')).toHaveTextContent('')
        expect(screen.getByTestId('Letter3')).toHaveStyle(
            `background-color: ${theme.letter.default}`
        )
    })

    it('Shows the trash icon and validity selector on mouse over', () => {
        render(
            <Wrapper>
                <Letter row={0} id={0} />
            </Wrapper>
        )
        expect(screen.queryByTestId('letter-validity-selector')).toBeNull()
        expect(screen.queryByTestId('remove-letter-icon')).toBeNull()
        fireEvent.mouseEnter(screen.getByText('A'))
        expect(
            screen.getByTestId('letter-validity-selector')
        ).toBeInTheDocument()
        expect(screen.getByTestId('remove-letter-icon')).toBeInTheDocument()
    })

    it('Handles a keypress on a letter', async () => {
        render(
            <Wrapper>
                <Letter row={0} id={0} />
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
                payload: { index: 0, letter: 'B', row: 0, valid: true },
                type: ADD_KNOWN_LETTER,
            },
        ])
    })

    it('Handles removing a letter by keypress', async () => {
        render(
            <Wrapper>
                <Letter row={0} id={0} />
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
                payload: { index: 0, letter: '', row: 0, valid: null },
                type: REMOVE_KNOWN_LETTER,
            },
        ])
    })

    it('Handles removing a letter by trash icon', async () => {
        render(
            <Wrapper>
                <Letter row={0} id={0} />
            </Wrapper>
        )
        expect(store.getActions()).toStrictEqual([])
        fireEvent.mouseEnter(screen.getByText('A'))
        fireEvent.click(screen.getByTestId('remove-letter-icon'))
        expect(store.getActions()).toStrictEqual([
            {
                payload: { index: 0, letter: '', row: 0, valid: null },
                type: REMOVE_KNOWN_LETTER,
            },
        ])
    })
})
