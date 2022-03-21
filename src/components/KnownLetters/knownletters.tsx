import * as React from 'react'
import styled from 'styled-components'
import { Letter } from 'components/Letter/letter'

const Container = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(5, 1fr);
    margin: 10px auto 0 auto;
    width: 415px;
`

export const KnownLetters = ({ row }: { row: number }) => (
    <Container>
        <Letter id={0} row={row} />
        <Letter id={1} row={row} />
        <Letter id={2} row={row} />
        <Letter id={3} row={row} />
        <Letter id={4} row={row} />
    </Container>
)
