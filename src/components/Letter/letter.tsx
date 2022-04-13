import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getLetterById, isLetterFocussed } from 'selectors/letters.selectors'
import { focusLetter, removeKnownLetter } from 'actions/letters.actions'
import { Icon, IconColors, Icons } from 'components/Icons/icon'
import { LetterValiditySelector } from 'components/Letter/lettervalidityselector'

const LetterContainer = styled.div<{ isFocussed: boolean; isValid: boolean }>`
    align-items: center;
    background-color: ${(props) =>
        props.isValid === null
            ? props.theme.letter.default
            : props.isValid
            ? props.theme.letter.valid
            : props.theme.letter.invalid};
    border: ${(props) =>
        props.isFocussed ? '2px solid orange' : '2px solid transparent'};
    border-radius: 5px;
    color: ${(props) => props.theme.letter.color};
    display: flex;
    height: 75px;
    justify-content: center;
    outline: 0;
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

export const Letter = ({
    index,
    row,
    ...rest
}: {
    index: number
    row: number
}) => {
    const dispatch = useDispatch()
    const isFocussed = useSelector(isLetterFocussed(row, index))
    const letter = useSelector(getLetterById(row, index))
    const [isHovering, setIsHovering] = useState(false)

    const handleClick = () => {
        dispatch(focusLetter(row, index))
    }

    return (
        <LetterContainer
            isFocussed={isFocussed}
            isValid={letter.valid}
            onClick={handleClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            {...rest}
        >
            {isHovering && letter.letter && (
                <RemoveLetterIcon
                    data-testid="remove-letter-icon"
                    onClick={(e) => {
                        e.stopPropagation()
                        dispatch(removeKnownLetter(row, index))
                    }}
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
                    index={index}
                    letter={letter.letter}
                    row={row}
                />
            )}
            <LetterText>{letter.letter}</LetterText>
        </LetterContainer>
    )
}
