import { Action } from './action.interface'

export const ADD_KNOWN_LETTER = 'ADD_KNOWN_LETTER'
export const FOCUS_LETTER = 'FOCUS_LETTER'
export const STORE_KNOWN_LETTER = 'STORE_KNOWN_LETTER'

export const focusLetter = (row: number, index: number) => ({
    type: FOCUS_LETTER,
    payload: {
        index,
        row,
    },
})

export const addKnownLetter = (letter: string, valid?: boolean) => ({
    type: ADD_KNOWN_LETTER,
    payload: {
        letter,
        valid,
    },
})

export const removeKnownLetter = (row: number, index: number): Action => ({
    type: STORE_KNOWN_LETTER,
    payload: {
        index,
        letter: '',
        row,
        valid: null,
    },
})

export const storeKnownLetter = (
    row: number,
    index: number,
    letter: string,
    valid: boolean
) => ({
    type: STORE_KNOWN_LETTER,
    payload: {
        index,
        letter,
        row,
        valid,
    },
})
