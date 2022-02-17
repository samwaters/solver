import * as React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { getInvalidLetters } from 'selectors/letters.selectors'
import { InvalidLetter } from 'components/Letter/invalidletter'

const Container = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(10, 1fr);
  margin: 0 auto;
  width: 540px;
`

export const InvalidLetters = () => {
  const invalidLetters = useSelector(getInvalidLetters)
  return <Container>
    {Object.keys(invalidLetters).map((key: string) => <InvalidLetter key={key} letter={invalidLetters[key]} />)}
  </Container>
}
