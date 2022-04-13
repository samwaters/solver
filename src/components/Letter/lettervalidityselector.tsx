import * as React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { storeKnownLetter } from 'actions/letters.actions'

const Container = styled.div`
    align-items: center;
    background-color: ${(props) => props.theme.header.background};
    border-radius: 0 0 5px 5px;
    bottom: -2px;
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(3, 1fr);
    height: 20px;
    justify-items: center;
    left: -2px;
    padding: 0 5px;
    position: absolute;
    width: 75px;
`

const Validity = styled.div<{ isValid: boolean | null }>`
    background-color: ${(props) =>
        props.isValid === null
            ? props.theme.letter.default
            : props.isValid
            ? props.theme.letter.valid
            : props.theme.letter.invalid};
    cursor: pointer;
    height: 12px;
    width: 12px;
`

interface LetterValiditySelectorProps {
    index: number
    letter: string
    row: number
}

export const LetterValiditySelector = ({
    index,
    letter,
    row,
}: LetterValiditySelectorProps) => {
    const dispatch = useDispatch()
    return (
        <Container data-testid="letter-validity-selector">
            <Validity
                isValid={null}
                onClick={() =>
                    dispatch(storeKnownLetter(row, index, letter, null))
                }
            />
            <Validity
                isValid={false}
                onClick={() =>
                    dispatch(storeKnownLetter(row, index, letter, false))
                }
            />
            <Validity
                isValid={true}
                onClick={() =>
                    dispatch(storeKnownLetter(row, index, letter, true))
                }
            />
        </Container>
    )
}
