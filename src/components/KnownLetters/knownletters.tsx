import * as React from 'react'
import styled from "styled-components";
import {Letter} from "components/Letter/letter";

const Container = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  margin: 0 auto;
  width: 540px;
`

export const KnownLetters = () => <Container>
  <Letter id={0} />
  <Letter id={1} />
  <Letter id={2} />
  <Letter id={3} />
  <Letter id={4} />
</Container>

