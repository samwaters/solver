import * as React from 'react'
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {addInvalidLetter} from "actions/letters.actions";

const AddContainer = styled.div`
    align-items: center;
    background-color: ${props => props.theme.letter.default};
    border: 2px dashed orange;
    border-radius: 5px;
    color: ${props => props.theme.letter.color};
    cursor: pointer;
    display: flex;
    height: 50px;
    justify-content: center;
    width:50px;
    :focus {
        outline: 0;
    }
`
const AddText = styled.span`
    font-family: "monospace";
    font-size: 36px;
    font-weight: bold;
`

export const Add = () => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(addInvalidLetter())
    }
    return <AddContainer onClick={handleClick}>
        <AddText>+</AddText>
    </AddContainer>
}