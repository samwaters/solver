import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    color: white;
    margin: 0 auto;
    max-width: 1000px;
`
const Header = styled.h1`
    font-size: 32px;
    margin-bottom: 10px;
`
const Message = styled.p`
    font-size: 26px;
    margin-bottom: 10px;
`
const List = styled.ul``
const ListItem = styled.li`
    font-family: Monospaced, monospace;
    margin-bottom: 5px;
`

export const Error = ({ error, stack }: { error: string; stack: string }) => (
    <Container>
        <Header>Error</Header>
        <Message>{error}</Message>
        <List>
            {stack.split('\n').map((s, i) => (
                <ListItem key={i}>{s}</ListItem>
            ))}
        </List>
        {stack}
    </Container>
)
