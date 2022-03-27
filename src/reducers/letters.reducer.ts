import { Action } from 'actions/action.interface'
import {
    ADD_KNOWN_LETTER,
    REMOVE_KNOWN_LETTER,
    SET_KNOWN_LETTER_VALIDITY,
} from 'actions/letters.actions'
import { RESET } from 'actions/reset.actions'

export interface LettersState {
    knownLetters: {
        [row: number]: {
            [id: number]: {
                letter: string
                valid: boolean | null
            }
        }
    }
}

const initialState: LettersState = {
    knownLetters: {
        0: {
            0: { letter: '', valid: null },
            1: { letter: '', valid: null },
            2: { letter: '', valid: null },
            3: { letter: '', valid: null },
            4: { letter: '', valid: null },
        },
        1: {
            0: { letter: '', valid: null },
            1: { letter: '', valid: null },
            2: { letter: '', valid: null },
            3: { letter: '', valid: null },
            4: { letter: '', valid: null },
        },
        2: {
            0: { letter: '', valid: null },
            1: { letter: '', valid: null },
            2: { letter: '', valid: null },
            3: { letter: '', valid: null },
            4: { letter: '', valid: null },
        },
        3: {
            0: { letter: '', valid: null },
            1: { letter: '', valid: null },
            2: { letter: '', valid: null },
            3: { letter: '', valid: null },
            4: { letter: '', valid: null },
        },
        4: {
            0: { letter: '', valid: null },
            1: { letter: '', valid: null },
            2: { letter: '', valid: null },
            3: { letter: '', valid: null },
            4: { letter: '', valid: null },
        },
    },
}

export const lettersReducer = (
    state: LettersState = initialState,
    action: Action
): LettersState => {
    switch (action.type) {
        case ADD_KNOWN_LETTER:
            return {
                ...state,
                knownLetters: {
                    ...state.knownLetters,
                    [action.payload.row]: {
                        ...state.knownLetters[action.payload.row],
                        [action.payload.index]: {
                            letter: action.payload.letter,
                            valid: action.payload.valid,
                        },
                    },
                },
            }
        case REMOVE_KNOWN_LETTER:
            return {
                ...state,
                knownLetters: {
                    ...state.knownLetters,
                    [action.payload.row]: {
                        ...state.knownLetters[action.payload.row],
                        [action.payload.index]: { letter: '', valid: null },
                    },
                },
            }
        case RESET:
            return initialState
        case SET_KNOWN_LETTER_VALIDITY:
            return {
                ...state,
                knownLetters: {
                    ...state.knownLetters,
                    [action.payload.row]: {
                        ...state.knownLetters[action.payload.row],
                        [action.payload.index]: {
                            ...state.knownLetters[action.payload.row][
                                action.payload.index
                            ],
                            valid: action.payload.valid,
                        },
                    },
                },
            }
        default:
            return state
    }
}
