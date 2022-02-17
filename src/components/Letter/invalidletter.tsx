import * as React from 'react'
import styled from 'styled-components'
import {useDispatch} from "react-redux";
import {KeyboardEvent} from "react";
import {addInvalidLetter, removeInvalidLetter} from "actions/letters.actions";

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

export const InvalidLetter = ({id, letter}: {id: string, letter: string}) => {
  const dispatch = useDispatch()
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if(/[A-Z]/i.test(event.key)) {
      dispatch(addInvalidLetter(id, event.key.toUpperCase()))
    }
  }
  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if(event.code === "Backspace") {
      dispatch(removeInvalidLetter(id))
    }
  }
  return <InvalidLetterContainer
      onKeyPress={handleKeyPress}
      onKeyUp={handleKeyUp}
      tabIndex={0}
  >
    <InvalidLetterText>{letter}</InvalidLetterText>
  </InvalidLetterContainer>
}
