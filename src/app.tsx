import * as React from 'react'
import { useSelector } from 'react-redux'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset'
import { ErrorBoundary } from 'components/ErrorBoundary/errorboundary'
import { Header } from 'components/Header/header'
import { KnownLetters } from 'components/KnownLetters/knownletters'
import { Loading } from 'components/Loading/loading'
import { Solutions } from 'components/Solutions/solutions'
import { isReady } from 'selectors/bootstrap.selectors'
import { Theme, theme } from 'theme/theme'

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
    @media (max-width: 1000px) {
        flex-direction: row;
    }
`

const GameContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
`

const LettersContainer = styled.div``

export const App = () => {
    const ready = useSelector(isReady)
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
                    </Container>
                )}
            </ErrorBoundary>
        </ThemeProvider>
    )
}
