import * as React from 'react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { KnownLetters } from 'components/KnownLetters/knownletters'
import { theme } from 'theme/theme'
import { getStore } from 'utils/test.utils'
import { render, screen } from '@testing-library/react'

describe('components/knownletters', () => {
    const store = getStore()
    const Wrapper = ({ children }: { children: ReactNode | ReactNode[] }) => (
        <Provider store={store}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
    )
    it('Renders the known letters', () => {
        render(
            <Wrapper>
                <KnownLetters row={0} />
            </Wrapper>
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
