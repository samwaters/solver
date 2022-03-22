import { Action } from './action.interface'

export const ADD_KNOWN_LETTER = 'ADD_KNOWN_LETTER'
export const REMOVE_KNOWN_LETTER = 'REMOVE_KNOWN_LETTER'
export const SET_KNOWN_LETTER_VALIDITY = 'SET_KNOWN_LETTER_VALIDITY'

export const addKnownLetter = (
    row: number,
    index: number,
    letter: string,
    valid = false
): Action => ({
    type: ADD_KNOWN_LETTER,
    payload: {
        index,
        letter,
        row,
        valid,
    },
})

export const removeKnownLetter = (row: number, index: number): Action => ({
    type: REMOVE_KNOWN_LETTER,
    payload: {
        index,
        row,
    },
})

export const setKnownLetterValidity = (
    row: number,
    index: number,
    letter: string,
    valid: boolean
): Action => ({
    type: SET_KNOWN_LETTER_VALIDITY,
    payload: {
        index,
        row,
        letter,
        valid,
    },
})
