import * as React from 'react'
import { KnownLetters } from 'components/KnownLetters/knownletters'
import { theme } from 'theme/theme'
import { TestWrapper } from 'utils/test.utils'
import { render, screen } from '@testing-library/react'

describe('components/knownletters', () => {
    it('Renders the known letters', () => {
        render(
            <TestWrapper>
                <KnownLetters row={0} />
            </TestWrapper>
        )
        expect(screen.getByTestId('knownletters-container')).toBeInTheDocument()
        expect(screen.getByTestId('knownletters-container')).toHaveStyle(`
			display: grid;
			gap: 10px;
			grid-template-columns: repeat(5,1fr);
			margin: 10px auto 0 auto;
			width: 415px;
		`)
        expect(screen.getByText('A')).toBeInTheDocument()
        expect(screen.getByText('A').parentElement).toHaveStyle(`
            background-color: ${theme.letter.valid}
        `)
        expect(screen.getByText('B')).toBeInTheDocument()
        expect(screen.getByText('B').parentElement).toHaveStyle(`
            background-color: ${theme.letter.invalid}
        `)
        expect(screen.getByText('C')).toBeInTheDocument()
        expect(screen.getByText('C').parentElement).toHaveStyle(`
            background-color: ${theme.letter.default}
        `)
    })
})
