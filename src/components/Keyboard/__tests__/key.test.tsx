import * as React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ADD_KNOWN_LETTER, STORE_KNOWN_LETTER } from 'actions/letters.actions'
import { Key } from 'components/Keyboard/key'
import { testStore, TestWrapper } from 'utils/test.utils'

jest.mock('../../../selectors/letters.selectors', () => ({
    getFocussedLetter: () => ({ row: 0, index: 1 }),
    getLetterById: () => () => ({ row: 0, index: 1, letter: 'A', valid: true }),
}))

describe('components/keyboard/key', () => {
    beforeEach(() => {
        testStore.clearActions()
    })
    it('Renders a letter key', () => {
        render(
            <TestWrapper>
                <Key data-testid="key-A" letter="A" />
            </TestWrapper>
        )
        const key = screen.getByTestId('key-A')
        expect(key).toBeInTheDocument()
        expect(key).toHaveTextContent('A')
        expect(key).toHaveStyle(`
            align-items: center;
            background-color: #454545;
            border-radius: 5px;
            color: white;
            cursor: pointer;
            display: flex;
            height: 40px;
            justify-content: center;
            width: 30px;
        `)
        expect(testStore.getActions()).toStrictEqual([])
        fireEvent.click(key)
        expect(testStore.getActions()).toStrictEqual([
            {
                type: ADD_KNOWN_LETTER,
                payload: { letter: 'A', valid: undefined },
            },
        ])
    })

    it('Renders a delete key', async () => {
        render(
            <TestWrapper>
                <Key data-testid="key-DEL" letter="DEL" />
            </TestWrapper>
        )
        const key = screen.getByTestId('key-DEL')
        expect(key).toBeInTheDocument()
        await waitFor(() =>
            expect(screen.getByTestId('icon-svg')).toBeInTheDocument()
        )
        expect(testStore.getActions()).toStrictEqual([])
        fireEvent.click(key)
        expect(testStore.getActions()).toStrictEqual([
            {
                type: STORE_KNOWN_LETTER,
                payload: { index: 1, letter: '', row: 0, valid: null },
            },
        ])
    })

    it('Renders an unknown key', () => {
        render(
            <TestWrapper>
                <Key data-testid="key-UNKNOWN" letter="UNKNOWN" />
            </TestWrapper>
        )
        const key = screen.getByTestId('key-UNKNOWN')
        expect(key).toBeInTheDocument()
        expect(key.firstChild).toHaveStyle(`
            background-color: #777c7e;
            height: 20px;
            width: 20px;
        `)
        expect(testStore.getActions()).toStrictEqual([])
        fireEvent.click(key)
        expect(testStore.getActions()).toStrictEqual([
            {
                type: ADD_KNOWN_LETTER,
                payload: { letter: 'A', valid: null },
            },
        ])
    })

    it('Renders an invalid key', () => {
        render(
            <TestWrapper>
                <Key data-testid="key-INVALID" letter="INVALID" />
            </TestWrapper>
        )
        const key = screen.getByTestId('key-INVALID')
        expect(key).toBeInTheDocument()
        expect(key.firstChild).toHaveStyle(`
            background-color: #cdb445;
            height: 20px;
            width: 20px;
        `)
        expect(testStore.getActions()).toStrictEqual([])
        fireEvent.click(key)
        expect(testStore.getActions()).toStrictEqual([
            {
                type: ADD_KNOWN_LETTER,
                payload: { letter: 'A', valid: false },
            },
        ])
    })

    it('Renders a valid key', () => {
        render(
            <TestWrapper>
                <Key data-testid="key-VALID" letter="VALID" />
            </TestWrapper>
        )
        const key = screen.getByTestId('key-VALID')
        expect(key).toBeInTheDocument()
        expect(key.firstChild).toHaveStyle(`
            background-color: #52ad5b;
            height: 20px;
            width: 20px;
        `)
        expect(testStore.getActions()).toStrictEqual([])
        fireEvent.click(key)
        expect(testStore.getActions()).toStrictEqual([
            {
                type: ADD_KNOWN_LETTER,
                payload: { letter: 'A', valid: true },
            },
        ])
    })
})
