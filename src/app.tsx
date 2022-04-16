import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset'
import { addKnownLetter, focusLetter } from 'actions/letters.actions'
import { ErrorBoundary } from 'components/ErrorBoundary/errorboundary'
import { Header } from 'components/Header/header'
import { KnownLetters } from 'components/KnownLetters/knownletters'
import { Loading } from 'components/Loading/loading'
import { Solutions } from 'components/Solutions/solutions'
import { isReady } from 'selectors/bootstrap.selectors'
import { Theme, theme } from 'theme/theme'
import { Keyboard } from 'components/Keyboard/keyboard'

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  * { box-sizing: border-box; }
  html, body, #app {
    background-color: ${(props) => props.theme.background};
    height: 100%; font-family: Roboto, sans-serif
  }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1000px;
`

const GameContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    @media (max-width: 749px) {
        flex-direction: column;
    }
`

const LettersContainer = styled.div``

export const App = () => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(focusLetter(-1, -1))
    }
    const handleKeyUp = (event: KeyboardEvent) => {
        if (/^[A-Z]$/i.test(event.key)) {
            dispatch(addKnownLetter(event.key.toUpperCase()))
        }
        if (event.code === 'Backspace') {
            dispatch(addKnownLetter('', null))
        }
    }
    const ready = useSelector(isReady)
    document.body.onclick = handleClick
    document.body.onkeyup = handleKeyUp
    return (
        <ThemeProvider theme={theme}>
            <Reset />
            <GlobalStyles />
            <ErrorBoundary>
                {!ready && <Loading />}
                {ready && (
                    <Container>
                        <Header />
                        <GameContainer>
                            <LettersContainer>
                                <KnownLetters row={0} />
                                <KnownLetters row={1} />
                                <KnownLetters row={2} />
                                <KnownLetters row={3} />
                                <KnownLetters row={4} />
                            </LettersContainer>
                            <Solutions />
                        </GameContainer>
                        <Keyboard />
                    </Container>
                )}
            </ErrorBoundary>
        </ThemeProvider>
    )
}
