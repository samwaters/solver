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
    height: 75px;
    justify-content: center;
    width: 75px;
    :focus {
        border: 2px solid orange;
        outline: 0;
    }
`
const LetterText = styled.span`
    font-family: 'Helvetica Neue', 'sans-serif';
    font-size: 48px;
    font-weight: bold;
`

export const Letter = ({ id, row, ...rest }: { id: number; row: number }) => {
    const dispatch = useDispatch()
    const letter = useSelector(getLetterById(row, id))

    const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        if (/[A-Z]/i.test(event.key)) {
            dispatch(
                addKnownLetter(
                    row,
                    id,
                    event.key.toUpperCase(),
                    letter.valid ?? false
                )
            )
        }
    }
    const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.code === 'Backspace') {
            dispatch(removeKnownLetter(row, id))
        }
    }
    return (
        <LetterContainer
            isValid={letter.valid}
            onClick={() =>
                dispatch(
                    setKnownLetterValidity(
                        row,
                        id,
                        letter.valid === null
                            ? false
                            : letter.valid === false
                            ? true
                            : null
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
