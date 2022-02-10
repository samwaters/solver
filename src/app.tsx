import * as React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset'
import { ErrorBoundary } from 'components/ErrorBoundary/errorboundary'
import { Game } from 'components/Game/game'
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
  max-width: 600px;
  @media(max-width: 600px) {
    flex-direction: row;
  }
`

export const App = () => <ThemeProvider theme={theme}>
  <Reset />
  <GlobalStyles />
  <ErrorBoundary>
    <Container>
      <Header />
      <Game />
      <Solutions />
    </Container>
  </ErrorBoundary>
</ThemeProvider>
