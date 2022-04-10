import * as React from 'react'
import { KeyboardEvent, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getLetterById } from 'selectors/letters.selectors'
import { addKnownLetter, removeKnownLetter } from 'actions/letters.actions'
import { Icon, IconColors, Icons } from 'components/Icons/icon'
import { LetterValiditySelector } from 'components/Letter/lettervalidityselector'

const LetterContainer = styled.div<{ isValid: boolean }>`
    align-items: center;
    background-color: ${(props) =>
        props.isValid === null
            ? props.theme.letter.default
            : props.isValid
            ? props.theme.letter.valid
            : props.theme.letter.invalid};
    border: 2px solid transparent;
    border-radius: 5px;
    color: ${(props) => props.theme.letter.color};
    display: flex;
    height: 75px;
    justify-content: center;
    position: relative;
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

const RemoveLetterIcon = styled.div`
    cursor: pointer;
    height: 16px;
    position: absolute;
    right: 3px;
    top: 3px;
    width: 16px;
`

export const Letter = ({ id, row, ...rest }: { id: number; row: number }) => {
    const dispatch = useDispatch()
    const letter = useSelector(getLetterById(row, id))
    const [isHovering, setIsHovering] = useState(false)

    const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        if (/[A-Z]/i.test(event.key)) {
            dispatch(
                addKnownLetter(
                    row,
                    id,
                    event.key.toUpperCase(),
                    letter.valid ?? null
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
            onKeyPress={handleKeyPress}
            onKeyUp={handleKeyUp}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            tabIndex={0}
            {...rest}
        >
            {isHovering && letter.letter && (
                <RemoveLetterIcon
                    data-testid="remove-letter-icon"
                    onClick={() => dispatch(removeKnownLetter(row, id))}
                >
                    <Icon
                        color={IconColors.WHITE}
                        height={16}
                        icon={Icons.TRASH}
                        width={16}
                    />
                </RemoveLetterIcon>
            )}
            {isHovering && letter.letter && (
                <LetterValiditySelector
                    index={id}
                    letter={letter.letter}
                    row={row}
                />
            )}
            <LetterText>{letter.letter}</LetterText>
        </LetterContainer>
    )
}
