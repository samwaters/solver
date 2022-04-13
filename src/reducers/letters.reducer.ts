import { Action } from 'actions/action.interface'
import { FOCUS_LETTER, STORE_KNOWN_LETTER } from 'actions/letters.actions'
import { RESET } from 'actions/reset.actions'

export interface LettersState {
    focus: {
        index: number
        row: number
    }
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
    focus: {
        index: -1,
        row: -1,
    },
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
        case FOCUS_LETTER:
            return {
                ...state,
                focus: {
                    ...action.payload,
                },
            }
        case RESET:
            return initialState
        case STORE_KNOWN_LETTER:
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
        default:
            return state
    }
}
