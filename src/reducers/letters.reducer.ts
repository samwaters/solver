import { Action } from 'actions/action.interface'
import {
    ADD_INVALID_LETTER,
    ADD_KNOWN_LETTER,
    REMOVE_INVALID_LETTER,
    REMOVE_KNOWN_LETTER,
    SET_KNOWN_LETTER_VALIDITY,
} from 'actions/letters.actions'

export interface LettersState {
    invalidLetters: {
        [id: number]: string
    }
    knownLetters: {
        [id: number]: {
            letter: string
            valid: boolean | null
        }
    }
}

const initialState: LettersState = {
    invalidLetters: {},
    knownLetters: {
        0: { letter: '', valid: null },
        1: { letter: '', valid: null },
        2: { letter: '', valid: null },
        3: { letter: '', valid: null },
        4: { letter: '', valid: null },
    },
}

export const lettersReducer = (
    state: LettersState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ADD_INVALID_LETTER:
            return {
                ...state,
                invalidLetters: {
                    ...state.invalidLetters,
                    [action.payload.id]: action.payload.letter,
                },
            }
        case ADD_KNOWN_LETTER:
            return {
                ...state,
                knownLetters: {
                    ...state.knownLetters,
                    [action.payload.index]: {
                        letter: action.payload.letter,
                        valid: action.payload.valid,
                    },
                },
            }
        case REMOVE_INVALID_LETTER:
            return {
                ...state,
                invalidLetters: Object.keys(state.invalidLetters)
                    .filter((id) => id !== action.payload.id)
                    .reduce((acc, cur) => {
                        acc[cur] = state.invalidLetters[cur]
                        return acc
                    }, {}),
            }
        case REMOVE_KNOWN_LETTER:
            return {
                ...state,
                knownLetters: {
                    ...state.knownLetters,
                    [action.payload.index]: { letter: '', valid: null },
                },
            }
        case SET_KNOWN_LETTER_VALIDITY:
            return {
                ...state,
                knownLetters: {
                    ...state.knownLetters,
                    [action.payload.index]: {
                        ...state.knownLetters[action.payload.index],
                        valid: action.payload.valid,
                    },
                },
            }
        default:
            return state
    }
}
