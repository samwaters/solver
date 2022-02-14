import * as React from 'react'
import styled from "styled-components";
import {Letter} from "components/Letter/letter";

const Container = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);
`

export const KnownLetters = () => {
  return <Container>
    <Letter />
    <Letter />
    <Letter />
    <Letter />
    <Letter />
  </Container>
}
