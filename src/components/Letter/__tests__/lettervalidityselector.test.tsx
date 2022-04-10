import * as React from 'react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { render, screen } from '@testing-library/react'
import { LetterValiditySelector } from 'components/Letter/lettervalidityselector'
import { theme } from 'theme/theme'
import { getStore } from 'utils/test.utils'

describe('components/letter/lettervalidityselector', () => {
    const store = getStore()
    const Wrapper = ({ children }: { children: ReactNode | ReactNode[] }) => (
        <Provider store={store}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
    )

    beforeEach(() => {
        store.clearActions()
    })
    it('Renders the selector', () => {
        const component = render(
            <Wrapper>
                <LetterValiditySelector index={0} letter="A" row={0} />
            </Wrapper>
        )
        expect(component).toMatchSnapshot()
    })
    it('Dispatches the validity actions', () => {
        render(
            <Wrapper>
                <LetterValiditySelector index={0} letter={'A'} row={1} />
            </Wrapper>
        )
        const container = screen.getByTestId('letter-validity-selector')
        expect(store.getActions()).toStrictEqual([])
    })
})
