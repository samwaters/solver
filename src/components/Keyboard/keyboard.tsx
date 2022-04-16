import * as React from 'react'
import { useSelector } from 'react-redux'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'
import { Key } from 'components/Keyboard/key'
import { getFocussedLetter } from 'selectors/letters.selectors'
import { useEffect, useState } from 'react'

const Container = styled.div<{
    state: 'entering' | 'entered' | 'exiting' | 'exited'
}>`
    margin: 0 auto;
    opacity: ${(props) =>
        props.state === 'entering' || props.state === 'entered' ? 1 : 0};
    transition: opacity 250ms ease-in-out;
    width: 1000px;
    @media (max-height: 599px) {
        background-color: rgba(0, 0, 0, 0.5);
        bottom: 0;
        position: sticky;
    }
    @media (max-width: 999px) {
        width: 100%;
    }
`

const KeyRow = styled.div<{ keyCount: number }>`
    display: grid;
    gap: 10px;
    grid-template-columns: ${(props) => `repeat(${props.keyCount}, 1fr)`};
    margin: 10px auto 0 auto;
    width: ${(props) => `${props.keyCount * 30 + (props.keyCount - 1) * 10}px`};
`

const KeySpacer = styled.div``

export const Keyboard = () => {
    const [visible, setVisible] = useState(false)
    const focusedLetter = useSelector(getFocussedLetter)
    useEffect(() => {
        setVisible(focusedLetter.row > -1)
    }, [focusedLetter])
    const rowMap = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
        ['UNKNOWN', 'INVALID', 'VALID', 'DEL'],
    ]

    return (
        <Transition in={visible} timeout={250}>
            {(state) => (
                <Container state={state}>
                    {state !== 'exited' &&
                        rowMap.map((row, index) => (
                            <KeyRow key={index} keyCount={row.length}>
                                {rowMap[index].map((letter) =>
                                    letter !== '' ? (
                                        <Key key={letter} letter={letter} />
                                    ) : (
                                        <KeySpacer />
                                    )
                                )}
                            </KeyRow>
                        ))}
                </Container>
            )}
        </Transition>
    )
}
