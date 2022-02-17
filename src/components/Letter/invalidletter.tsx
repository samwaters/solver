import * as React from 'react'
import styled from 'styled-components'

const InvalidLetterContainer = styled.div`
    align-items: center;
    background-color: ${props => props.theme.letter.default};
    border-radius: 5px;
    color: ${props => props.theme.letter.color};
    display: flex;
    height: 50px;
    justify-content: center;
    width:50px;
    :focus {
        border: 2px solid orange;
        outline: 0;
    }
`
const InvalidLetterText = styled.span`
    font-family: "Helvetica Neue", "sans-serif";
    font-size: 36px;
    font-weight: bold;
`

export const InvalidLetter = ({letter}: {letter: string}) => {
  return <InvalidLetterContainer tabIndex={0}>
    <InvalidLetterText>{letter}</InvalidLetterText>
  </InvalidLetterContainer>
}
