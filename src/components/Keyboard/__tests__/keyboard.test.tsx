import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { TestWrapper } from 'utils/test.utils'
import { Keyboard } from 'components/Keyboard/keyboard'

jest.mock('react-transition-group', () => {
    const FakeTransition = jest
        .fn()
        .mockImplementationOnce(({ children }) => children('exited'))
        .mockImplementationOnce(({ children }) => children('entered'))
    return { Transition: FakeTransition }
})

jest.mock('../../../selectors/letters.selectors', () => ({
    getFocussedLetter: () => ({ row: 0, index: 1 }),
    getLetterById: () => () => ({ row: 0, index: 1, letter: 'A', valid: true }),
}))

describe('components/keyboard/keyboard', () => {
    it('Keyboard is not visible when no letter is focussed', () => {
        render(
            <TestWrapper>
                <Keyboard />
            </TestWrapper>
        )
        expect(screen.queryByText('Q')).toBeNull()
    })

    it('Renders a keyboard when a letter is focussed', async () => {
        render(
            <TestWrapper>
                <Keyboard />
            </TestWrapper>
        )
        await waitFor(() => expect(screen.getByText('Q')).toBeInTheDocument())
        expect(screen.getByTestId('keyboard-container')).toHaveStyle(`
            margin: 0 auto;
            opacity: 1;
            transition: opacity 250ms ease-in-out;
            width: 1000px;
        `)
        expect(screen.getByTestId('keyboard-container').children[0])
            .toHaveStyle(`
            display: grid;
            gap: 10px;
            grid-template-columns: repeat(10,1fr);
            margin: 10px auto 0 auto;
            width: 390px;
        `)
        expect(screen.getByTestId('keyboard-container').children[1])
            .toHaveStyle(`
            display: grid;
            gap: 10px;
            grid-template-columns: repeat(9,1fr);
            margin: 10px auto 0 auto;
            width: 350px;
        `)
        expect(screen.getByTestId('keyboard-container').children[2])
            .toHaveStyle(`
            display: grid;
            gap: 10px;
            grid-template-columns: repeat(7,1fr);
            margin: 10px auto 0 auto;
            width: 270px;
        `)
        expect(screen.getByTestId('keyboard-container').children[3])
            .toHaveStyle(`
            display: grid;
            gap: 10px;
            grid-template-columns: repeat(4,1fr);
            margin: 10px auto 0 auto;
            width: 150px;
        `)
    })
})
