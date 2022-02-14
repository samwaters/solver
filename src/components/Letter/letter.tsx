import * as React from 'react'
import styled from "styled-components";
import {useState} from "react";

const LetterContainer = styled.div`
    background-color: ${props => props.color}
    height: 100px;
    width:100px;
`

export const Letter = () => {
    const colorMap = {
        default: "#777c7e",
        invalid: "#cdb445",
        valid: "#52ad5b*",
    }
    const [value, setValue] = useState("")
    return <LetterContainer>
        A
    </LetterContainer>
}