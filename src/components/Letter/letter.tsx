import * as React from 'react'
import styled from 'styled-components'
import { KeyboardEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLetterById } from 'selectors/letters.selectors'
import {
    addKnownLetter,
    removeKnownLetter,
    setKnownLetterValidity,
} from 'actions/letters.actions'

const LetterContainer = styled.div<{ isValid: boolean }>`
    align-items: center;
    background-color: ${(props) =>
        props.isValid === null
            ? props.theme.letter.default
            : props.isValid
            ? props.theme.letter.valid
            : props.theme.letter.invalid};
    border-radius: 5px;
    color: ${(props) => props.theme.letter.color};
    display: flex;
    height: 100px;
    justify-content: center;
    width: 100px;
    :focus {
        border: 2px solid orange;
        outline: 0;
    }
`
const LetterText = styled.span`
    font-family: 'Helvetica Neue', 'sans-serif';
    font-size: 60px;
    font-weight: bold;
`

export const Letter = ({ id, ...rest }: { id: number }) => {
    const dispatch = useDispatch()
    const letter = useSelector(getLetterById(id))
    const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        if (/[A-Z]/i.test(event.key)) {
            dispatch(
                addKnownLetter(
                    id,
                    event.key.toUpperCase(),
                    letter.valid ?? false
                )
            )
        }
    }
    const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.code === 'Backspace') {
            dispatch(removeKnownLetter(id))
        }
    }
    return (
        <LetterContainer
            isValid={letter.valid}
            onClick={() =>
                dispatch(
                    setKnownLetterValidity(
                        id,
                        letter.valid === null ? false : !letter.valid
                    )
                )
            }
            onKeyPress={handleKeyPress}
            onKeyUp={handleKeyUp}
            tabIndex={0}
            {...rest}
        >
            <LetterText>{letter.letter}</LetterText>
        </LetterContainer>
    )
}
