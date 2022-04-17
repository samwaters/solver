import * as React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { STORE_KNOWN_LETTER } from 'actions/letters.actions'
import { Letter } from 'components/Letter/letter'
import { theme } from 'theme/theme'
import { testStore, TestWrapper } from 'utils/test.utils'

describe('components/letter', () => {
    beforeEach(() => {
        testStore.clearActions()
    })

    it('Renders a valid letter', () => {
        render(
            <TestWrapper>
                <Letter data-testid="Letter0" row={0} index={0} />
            </TestWrapper>
        )
        expect(screen.getByTestId('Letter0')).toHaveTextContent('A')
        expect(screen.getByTestId('Letter0')).toHaveStyle(
            `background-color: ${theme.letter.valid}; height: 75px; width: 75px;`
        )
        expect(screen.getByText('A')).toBeInTheDocument()
    })

    it('Renders a known letter in the wrong place', () => {
        render(
            <TestWrapper>
                <Letter data-testid="Letter1" row={0} index={1} />
            </TestWrapper>
        )
        expect(screen.getByTestId('Letter1')).toHaveTextContent('B')
        expect(screen.getByTestId('Letter1')).toHaveStyle(
            `background-color: ${theme.letter.invalid}`
        )
        expect(screen.getByText('B')).toBeInTheDocument()
    })

    it('Renders an invalid letter', () => {
        render(
            <TestWrapper>
                <Letter data-testid="Letter2" row={0} index={2} />
            </TestWrapper>
        )
        expect(screen.getByTestId('Letter2')).toHaveTextContent('C')
        expect(screen.getByTestId('Letter2')).toHaveStyle(
            `background-color: ${theme.letter.default}`
        )
        expect(screen.getByText('C')).toBeInTheDocument()
    })

    it('Renders an empty letter', () => {
        render(
            <TestWrapper>
                <Letter data-testid="Letter3" row={0} index={3} />
            </TestWrapper>
        )
        expect(screen.getByTestId('Letter3')).toHaveTextContent('')
        expect(screen.getByTestId('Letter3')).toHaveStyle(
            `background-color: ${theme.letter.default}`
        )
    })

    it('Shows the trash icon and validity selector on mouse over', () => {
        act(() => {
            render(
                <TestWrapper>
                    <Letter row={0} index={0} />
                </TestWrapper>
            )
        })
        expect(screen.queryByTestId('letter-validity-selector')).toBeNull()
        expect(screen.queryByTestId('remove-letter-icon')).toBeNull()
        act(() => {
            fireEvent.mouseEnter(screen.getByText('A'))
        })
        expect(
            screen.getByTestId('letter-validity-selector')
        ).toBeInTheDocument()
        expect(screen.getByTestId('remove-letter-icon')).toBeInTheDocument()
    })

    it('Handles removing a letter by trash icon', async () => {
        act(() => {
            render(
                <TestWrapper>
                    <Letter row={0} index={0} />
                </TestWrapper>
            )
        })
        expect(testStore.getActions()).toStrictEqual([])
        act(() => {
            fireEvent.mouseEnter(screen.getByText('A'))
        })
        await waitFor(() =>
            expect(screen.getByTestId('remove-letter-icon')).toBeInTheDocument()
        )
        act(() => {
            fireEvent.click(screen.getByTestId('remove-letter-icon'))
        })
        expect(testStore.getActions()).toStrictEqual([
            {
                payload: { index: 0, letter: '', row: 0, valid: null },
                type: STORE_KNOWN_LETTER,
            },
        ])
    })
})
