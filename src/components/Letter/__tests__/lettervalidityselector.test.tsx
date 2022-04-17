import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { LetterValiditySelector } from 'components/Letter/lettervalidityselector'
import { testStore, TestWrapper } from 'utils/test.utils'
import { STORE_KNOWN_LETTER } from 'actions/letters.actions'

describe('components/letter/lettervalidityselector', () => {
    beforeEach(() => {
        testStore.clearActions()
    })
    it('Renders the selector', () => {
        const component = render(
            <TestWrapper>
                <LetterValiditySelector index={0} letter="A" row={0} />
            </TestWrapper>
        )
        expect(component).toMatchSnapshot()
    })
    it('Dispatches the validity actions', () => {
        render(
            <TestWrapper>
                <LetterValiditySelector index={0} letter={'A'} row={1} />
            </TestWrapper>
        )
        const container = screen.getByTestId('letter-validity-selector')
        expect(testStore.getActions()).toStrictEqual([])
        // Unknown
        fireEvent.click(container.children[0])
        expect(testStore.getActions()).toStrictEqual([
            {
                payload: {
                    index: 0,
                    letter: 'A',
                    row: 1,
                    valid: null,
                },
                type: STORE_KNOWN_LETTER,
            },
        ])
        testStore.clearActions()
        // Invalid
        fireEvent.click(container.children[1])
        expect(testStore.getActions()).toStrictEqual([
            {
                payload: {
                    index: 0,
                    letter: 'A',
                    row: 1,
                    valid: false,
                },
                type: STORE_KNOWN_LETTER,
            },
        ])
        testStore.clearActions()
        // Valid
        fireEvent.click(container.children[2])
        expect(testStore.getActions()).toStrictEqual([
            {
                payload: {
                    index: 0,
                    letter: 'A',
                    row: 1,
                    valid: true,
                },
                type: STORE_KNOWN_LETTER,
            },
        ])
    })
})
