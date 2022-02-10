import * as React from 'react'
import styled from 'styled-components'
import { Theme } from 'theme/theme'

const HeaderComponent = styled.div<{theme: Theme}>`
  background-color: ${props => props.theme.header.background};
  padding: 5px 10px;
`

const HeaderText = styled.h1<{theme: Theme}>`
  color: ${props => props.theme.header.color};
  font-size: ${props => props.theme.header.size};
`

export const Header = () => <HeaderComponent>
  <HeaderText>Solver</HeaderText>
</HeaderComponent>
