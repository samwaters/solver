import * as React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset'
import { ErrorBoundary } from 'components/ErrorBoundary/errorboundary'
import { KnownLetters } from 'components/KnownLetters/knownletters'
import { Solutions } from 'components/Solutions/solutions'
import { Theme, theme } from 'theme/theme'
import { Header } from 'components/Header/header'


const GlobalStyles = createGlobalStyle<{theme: Theme}>`
  * { box-sizing: border-box; }
  html, body, #app {
    background-color: ${props => props.theme.background};
    height: 100%; font-family: Roboto, sans-serif
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1000px;
  @media(max-width: 1000px) {
    flex-direction: row;
  }
`

const Section = styled.div`
  
`

export const App = () => <ThemeProvider theme={theme}>
  <Reset />
  <GlobalStyles />
  <ErrorBoundary>
    <Container>
      <Header />
      <KnownLetters />
      <Solutions />
    </Container>
  </ErrorBoundary>
</ThemeProvider>
