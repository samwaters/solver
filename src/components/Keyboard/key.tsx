import * as React from 'react'
import { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { addKnownLetter, removeKnownLetter } from 'actions/letters.actions'
import { getFocussedLetter, getLetterById } from 'selectors/letters.selectors'
import { Icon, Icons } from 'components/Icons/icon'

const KeyContainer = styled.div`
    align-items: center;
    background-color: ${(props) => props.theme.header.background};
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    height: 30px;
    justify-content: center;
    width: 30px;
`

const KeyValidity = styled.div<{ valid: boolean | null }>`
    background-color: ${(props) =>
        props.valid === null
            ? props.theme.letter.default
            : props.valid
            ? props.theme.letter.valid
            : props.theme.letter.invalid};
    height: 20px;
    width: 20px;
`

export interface KeyProps {
    letter: string
}

export const Key = ({ letter }: KeyProps) => {
    const dispatch = useDispatch()
    const focussedLetter = useSelector(getFocussedLetter)
    const letterData = useSelector(
        getLetterById(focussedLetter.row, focussedLetter.index)
    )
    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        switch (letter) {
            case 'DEL':
                dispatch(
                    removeKnownLetter(focussedLetter.row, focussedLetter.index)
                )
                break
            case 'INVALID':
                dispatch(addKnownLetter(letterData.letter, false))
                break
            case 'VALID':
                dispatch(addKnownLetter(letterData.letter, true))
                break
            case 'UNKNOWN':
                dispatch(addKnownLetter(letterData.letter, null))
                break
            default:
                dispatch(addKnownLetter(letter))
                break
        }
    }
    return (
        <KeyContainer onClick={handleClick}>
            {letter.length === 1 ? letter : null}
            {letter === 'DEL' && (
                <Icon height={20} icon={Icons.BACKSPACE} width={20} />
            )}
            {letter === 'INVALID' && <KeyValidity valid={false} />}
            {letter === 'VALID' && <KeyValidity valid={true} />}
            {letter === 'UNKNOWN' && <KeyValidity valid={null} />}
        </KeyContainer>
    )
}
