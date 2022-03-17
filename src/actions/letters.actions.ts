import { Action } from './action.interface'

export const ADD_INVALID_LETTER = 'ADD_INVALID_LETTER'
export const REMOVE_INVALID_LETTER = 'REMOVE_INVALID_LETTER'
export const ADD_KNOWN_LETTER = 'ADD_KNOWN_LETTER'
export const REMOVE_KNOWN_LETTER = 'REMOVE_KNOWN_LETTER'
export const SET_KNOWN_LETTER_VALIDITY = 'SET_KNOWN_LETTER_VALIDITY'

export const addInvalidLetter = (id: string = null, letter = ''): Action => ({
    type: ADD_INVALID_LETTER,
    payload: {
        id: id ?? new Date().getTime(),
        letter,
    },
})

export const removeInvalidLetter = (id: string): Action => ({
    type: REMOVE_INVALID_LETTER,
    payload: {
        id,
    },
})

export const addKnownLetter = (
    index: number,
    letter: string,
    valid = false
): Action => ({
    type: ADD_KNOWN_LETTER,
    payload: {
        index,
        letter,
        valid,
    },
})

export const removeKnownLetter = (index: number): Action => ({
    type: REMOVE_KNOWN_LETTER,
    payload: {
        index,
    },
})

export const setKnownLetterValidity = (
    index: number,
    valid: boolean
): Action => ({
    type: SET_KNOWN_LETTER_VALIDITY,
    payload: {
        index,
        valid,
    },
})
